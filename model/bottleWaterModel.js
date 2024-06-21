const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

// Define the schema
const bottledWaterSchema = new mongoose.Schema({
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
  waterType: {
    type: String,
    enum: [
      "Drinking Water",
      "Non-Drinking Water"
    ]
  },
  waterBottleCapacity: {
    type: Number
  },
  waterBottleQuantity: {
    type: Number
  },
  noOfTrips: {
    type: Number
  },
  fuelUsedByTruck: {
    type: Number
  },
  supportingDocument: {
    type: String
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},{timestamps:true}
);

// Create a model using the schema
const BottledWater = mongoose.model('BottledWater', bottledWaterSchema);

module.exports = BottledWater;
