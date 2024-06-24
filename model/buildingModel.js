const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");
const supplierSubcontractor = require("../model/supplierModel");

// Define the schema
const buildingMaterialSchema = new mongoose.Schema({
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
    required: false
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
    type: mongoose.Types.ObjectId,
    ref:supplierSubcontractor,
    required: false
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
    type: String
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
  },
  safeDelete:{
    type: Boolean,
    default:false
  },
},
{timestamps:true}
);

// Create a model using the schema
const BuildingMaterial = mongoose.model('BuildingMaterial', buildingMaterialSchema);

module.exports = BuildingMaterial;
