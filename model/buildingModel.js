const mongoose = require('mongoose');

// Define the schema
const buildingMaterialSchema = new mongoose.Schema({
  buildingMaterialID: {
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
  emissionInputID: {
    type: Number,
    required: true
  },
  materialType: {
    type: String,
    enum: [
      "Rebar",
      "Asphalt",
      "Mortar",
      "HDPE",
      "uPVC",
      "Timber",
      "Aggregate",
      "Plywood"
    ],
    required: true
  },
  materialSource: {
    type: String,
    enum: [
      "Internal",
      "External",
      "Abu Dhabi",
      "Dubai",
      "Other Emirate",
      "GCC",
      "Internationally"
    ],
    required: true
  },
  materialClassification: {
    type: String,
    enum: [
      "Renewable",
      "Non-Renewable"
    ],
    required: true
  },
  supplierSubcontractor: {
    type: String
  },
  roadDistance: {
    type: Number
  },
  noOfTrips: {
    type: Number
  },
  fuelUsed: {
    type: Number
  },
  weightPerBOQ: {
    type: Number
  },
  percentageOfTotalMaterialProcurementIsRecycled: {
    type: Number
  },
  procuredMaterial: {
    type: Number
  },
  materialCost: {
    type: Number
  },
  supportingDocument: {
    type: Buffer
  },
  quantificationMethod: {
    type: String,
    enum: [
      "Estimated",
      "Measured"
    ]
  },
  percentageReclaimedMaterial: {
    type: Number
  }
},
{timestamps:true}
);

// Create a model using the schema
const BuildingMaterial = mongoose.model('BuildingMaterial', buildingMaterialSchema);

module.exports = BuildingMaterial;
