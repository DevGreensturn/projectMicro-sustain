const mongoose = require('mongoose');
const { Schema } = mongoose;
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const energyReductionSchema = new Schema({
  energyReductionID: {
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
  energyConsumptionID: {
    type: String,
    required: false
  },
  initiativeName: {
    type: String
  },
  source: {
    type: String,
    enum: ['Utility Provider Energy', 'Renewable Energy', 'Non-Renewable Energy']
  },
  energyAmount: {
    type: Number
  },
  unit: {
    type: String,
    enum: ['kWh', 'Joule', 'Wh']
  },
  calculationMethod: {
    type: String,
    enum: ['Estimated', 'Modeled', 'Measured']
  }
},{timestamps:true}
);

const EnergyReduction = mongoose.model('EnergyReduction', energyReductionSchema);

module.exports = EnergyReduction;
