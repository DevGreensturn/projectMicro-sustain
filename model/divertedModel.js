const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");
const wasteManagement = require("../model/wasteManagementModel");

// Define the schema
const DivertedDisposalSchema = new mongoose.Schema({
  wasteId: {
    type: mongoose.Types.ObjectId,
    ref:wasteManagement,
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
  mainCollectionCompany:{
    type: String,
    required: true,
  },
  noOfTrips:{
    type: Number,
    required: true,
  },
  fuelUsed:{
    type: Number,
    required: true,
  },
  kindOfWaste:{
    type: String,
    enum: [
      "hazard", "non-hazard"
    ]
  },
  wasteType: {
    type: String,
    enum:[
      "solid", "liquid"
    ]
  },
  divertedOperationType: {
    type: String,
    enum: [
      "Reuse",
      "Recycling",
      "Others"
    ]
  },
  quantity: {
    type: Number
  },
  unit: {
    type: String
  },
  supportingDocument: {
    type: String
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},
{timestamps:true}
);

// Create the model
const DivertedDisposal = mongoose.model('DivertedDisposal', DivertedDisposalSchema);

module.exports = DivertedDisposal;
