const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");
const wasteManagement = require("../model/wasteManagementModel");

const directedDisposalSchema = new mongoose.Schema({
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
    required: true
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
  directedOperationType: {
    type: String,
    enum: [
      "Incineration with energy recovery",
      "Incineration without energy recovery",
      "Landfilling",
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
    type: Buffer
  },
  safeDelete: {
    type: Boolean
  },
},
{timestamps:true}
);

const DirectedDisposal = mongoose.model('DirectedDisposal', directedDisposalSchema);

module.exports = DirectedDisposal;
