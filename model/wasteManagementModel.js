const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const wasteSchema = new mongoose.Schema({
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
  kindOfWaste: {
    type: String
  },
  wasteType: {
    type: String
  },
  mainCollectionCompany: {
    type: String
  },
  totalWasteRemovedFromSite: {
    type: Number
  },
  unitOfMeasurement: {
    type: String,
    enum: [
      "Kg",
      "Litre",
      "Tonne",
      "Cubic Meter",
      "US Gallon"
    ]
  },
  noOfTrips: {
    type: Number
  },
  fuelUsed: {
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

const Waste = mongoose.model('wasteManagement', wasteSchema);

module.exports = Waste;
