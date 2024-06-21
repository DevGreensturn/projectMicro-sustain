const mongoose = require('mongoose');
const { Schema } = mongoose;
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

// Define the schema
const concreteMixSchema = new Schema({
  
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
  emissionInputID: {
    type: Number,
    required: true
  },
  concreteMixesNo: {
    type: String
  },
  type: {
    type: String,
    enum: ["precast", "cast-in-situ"]
  },
  volume: {
    type: Number
  },
  proportionOfTotalUsed: {
    type: Number
  },
  days28Strength: {
    type: Number
  },
  cementContent: {
    type: Number
  },
  slagContent: {
    type: Number
  },
  flyAshContent: {
    type: Number
  },
  silicaFumeContent: {
    type: Number
  },
  naturePozzolanContent: {
    type: Number
  },
  limestoneContent: {
    type: Number
  },
  embodiedGHG: {
    type: Number
  },
  noOfTrips: {
    type: Number
  },
  fuelUsedPerTruck: {
    type: Number
  },
  safeDelete:{
    type: Boolean,
    default:false
  }
},{timestamps:true}
);

// Create a model using the schema
const ConcreteMix = mongoose.model('concreteMix', concreteMixSchema);

module.exports = ConcreteMix;
