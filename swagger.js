// swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProjectMicro-sustain API Documentation',
      version: '1.0.0',
      description: 'ProjectMicro-sustain API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3002}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, 'routes', 'v1', '*.js')], // Absolute path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;