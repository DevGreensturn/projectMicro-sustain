const mongoose = require('mongoose');

// Define the schema
const waterConsumptionSchema = new mongoose.Schema({
  waterTankerID: {
    type: Number,
    required: false
  },
  packageId: {
    type: mongoose.Types.ObjectId,
    ref:"package",
    required: false
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref:"project",
    required: false
  },
  reportId: {
    type: mongoose.Types.ObjectId,
    ref:"monthlyReport",
    required: false
  },
  waterConsumptionID: {
    type: Number,
    required: true
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
  Unit: {
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
  }
},{timestamps:true}
);

// Create a model using the schema
const WaterConsumption = mongoose.model('WaterConsumption', waterConsumptionSchema);

module.exports = WaterConsumption;
