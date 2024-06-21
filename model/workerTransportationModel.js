const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const workerTransportationSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Types.ObjectId,
    ref:package,
    required: false
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref:project,
    required: false
  },
  reportId: {
    type: mongoose.Types.ObjectId,
    ref:monthlyReport,
    required: false
  },

  emissionInputId: {
    type: Number,
    required: false
  },
  numberOfTripsByBuses: {
    type: Number,
    required: false
  },
  distanceTraveledPerOneTripByBus: {
    type: Number,
    required: false
  },
  fuelConsumption: {
    type: Number,
    required: false
  },
  safeDelete:{
    type: Boolean
  }
}, { timestamps: true });

const WorkerTransportation = mongoose.model('workerTransportation', workerTransportationSchema);

module.exports = WorkerTransportation;
