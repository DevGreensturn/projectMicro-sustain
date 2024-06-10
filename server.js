require("dotenv").config();
const express = require('express');
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3002;
const responseTime = require('response-time');
const helmet = require("helmet");
const cluster = require('cluster');
const nocache = require("nocache");
const mongoose = require('mongoose');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express'); 
const swaggerSpecs = require('./swagger'); 

app.use(nocache());
app.disable('view cache');
app.set('etag', false);
app.use(helmet());

app.use(responseTime());
app.use(cors());
app.use(responseTime());

app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true, limit: '1024mb' }));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.status(400).send({ status: 400, success: false, message: 'Bad request.', error });
  }
  next();
});
mongoose.set('debug', true);

process
  .on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    console.log(`${new Date().toUTCString()} uncaughtException:${err.message}`);
    console.log(`${err.stack}`, '========error======>', err);
    process.exit(1);
  });

if (cluster.isMaster) {
  for (let i = 0; i < 1; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker *************************************=====>\n${worker.process.pid} is online.`);
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  try {
    app.listen(port, async () => {
      try {
        let dbConnection = await require("./db/connection").dbConnectionFunction();
        app.set("view engine", "ejs");

        // Add Swagger UI before routes
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

        routes(app);

        app.use((err, req, res, next) => {
          res.locals.message = err.message;
          return res.status(err.status || 500).send({
            status: false,
            statusCode: err.status || 500,
            message: err.message
          });
        });
        console.log(`Project microservice listening at http://localhost:${port}`);
        console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);

      } catch (error) {
        console.log('Could not connect to the config project ms server: ', error);
      }
    });
  } catch (error) {
    console.log(`Server is not responding.${error}`);
  }
}