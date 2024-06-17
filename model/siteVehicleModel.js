const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const vehicleTransportationSchema = new mongoose.Schema({
  vehicleId: {
    type: Number,
    required: false
  },
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
  numberOfVehicles: {
    type: Number,
    required: false
  },
  distanceTraveledForAllVehicles: {
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

const VehicleTransportation = mongoose.model('vehicleTransportation', vehicleTransportationSchema);

module.exports = VehicleTransportation;
