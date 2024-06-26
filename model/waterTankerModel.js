const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

// Define the schema
const waterConsumptionSchema = new mongoose.Schema({
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
      "Surface Water",
      "Ground Water",
      "Sea Water",
      "Produced Water",
      "Third-Party Water"
    ]
  },
  drinkingNonDrinkingWater: {
    type: String,
    enum: [
      "Drinking Water",
      "Non-Drinking Water"
    ]
  },
  waterConsumption: {
    type: Number
  },
  unit: {
    type: String,
    enum: [
      "US Gallon",
      "Litre",
      "Cubic Meter"
    ]
  },
  tankerCapacity: {
    type: Number
  },
  noOfTrips: {
    type: Number
  },
  fuelUsedByTruck: {
    type: Number
  },
  supportingDocument: {
    type: String,
    default:""
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},{timestamps:true}
);

// Create a model using the schema
const WaterConsumption = mongoose.model('WaterConsumption', waterConsumptionSchema);

module.exports = WaterConsumption;
