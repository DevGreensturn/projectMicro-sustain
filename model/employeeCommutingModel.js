const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const employeeTransportationSchema = new mongoose.Schema({
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
    required: true
  },
  numberOfEmployees: {
    type: Number,
    required: false
  },
  numberOfVehicles: {
    type: Number,
    required: false
  },
  averageDistanceTravelledForVehicle: {
    type: Number,
    required: false
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
}, { timestamps: true });

const EmployeeTransportation = mongoose.model('EmployeeTransportation', employeeTransportationSchema);

module.exports = EmployeeTransportation;
