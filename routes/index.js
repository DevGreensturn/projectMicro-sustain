module.exports = function (app) {
  app.use("/api/v1/packages", require('./v1/package'));
  app.use("/api/v1/projects", require('./v1/project'));
  app.use("/api/v1/monthly-reports", require('./v1/monthlyReport'));
  app.use("/api/v1/data-entry", require('./v1/dataEntry'));
  app.use("/api/v1/charts", require('./v1/charts'));
  app.use("/api/v1/factors", require('./v1/factors'));
};
  