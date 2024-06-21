const mongoose = require('mongoose');
const { Schema } = mongoose;
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const soldEnergySchema = new Schema({
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
    type: String,
    required: false
  },
  readingDate: {
    type: Date
  },
  energyType: {
    type: String,
    enum: ['Electricity', 'Heating', 'Cooling', 'Steam']
  },
  soldEnergy: {
    type: Number
  },
  unit: {
    type: String,
    enum: ['Kwh', 'Joule', 'Wh']
  },
  supportingDocument: {
    type: Buffer
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},{timestamps:true});

const SoldEnergy = mongoose.model('SoldEnergy', soldEnergySchema);

module.exports = SoldEnergy;
