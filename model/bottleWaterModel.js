const mongoose = require('mongoose');

// Define the schema
const bottledWaterSchema = new mongoose.Schema({
  bottledWaterID: {
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
  }
},{timestamps:true}
);

// Create a model using the schema
const BottledWater = mongoose.model('BottledWater', bottledWaterSchema);

module.exports = BottledWater;
