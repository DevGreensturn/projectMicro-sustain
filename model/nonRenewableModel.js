const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const energyNonRenewableSchema = new mongoose.Schema({
  energyNonRenewableId: {
    type: Number,
    required: false,
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
  fuelType: {
    type: String,
    enum: ['Diesel','Petrol','CNG']
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
  energyOutput:{
    type: Number,
  },
  equipment: {
    type: String,
    enum: ['Equipment', 'Generator', 'Others']
  },
  unit: {
    type: String,
    enum: ['US Gallon', 'Litre', 'Cubic Meter']
  },
  totalSpending: {
    type: Number
  },
  supportingDocument: {
    type: Buffer
  },
  noOfTrips: {
    type: Number
  },
  fuelUsedByTrucks: {
    type: Number
  }
},{timestamps:true}
);

const EnergyNonRenewable = mongoose.model('EnergyNonRenewable', energyNonRenewableSchema);

module.exports = EnergyNonRenewable;
