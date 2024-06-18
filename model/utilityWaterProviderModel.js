const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const utilityWaterProviderSchema = new Schema({
  utilityProviderWaterID: {
    type: Number,
    required: true,
    unique: true
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
    required: true
  },
  meterNo: {
    type: Number
  },
  accountNo: {
    type: Number
  },
  serviceProvider: {
    type: String
  },
  readingDate: {
    type: Date
  },
  meterReading: {
    type: Number
  },
  waterType: {
    type: String,
    enum: ["Drinking Water", "Non-Drinking Water"]
  },
  consumption: {
    type: Number
  },
  unit: {
    type: String,
    enum: ["US Gallon", "Litre", "Cubic Meter"]
  },
  supportingDocument:{
    type: String,
    required: false
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},{timestamps:true}
);

const WaterConsumption = mongoose.model('utilityWaterProvider', utilityWaterProviderSchema);

module.exports = WaterConsumption;
