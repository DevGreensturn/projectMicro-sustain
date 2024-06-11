const mongoose = require('mongoose');
const monthlyReport = require("../model/monthlyReportModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");
const wasteManagement = require("../model/wasteManagementModel");

// Define the schema
const DivertedDisposalSchema = new mongoose.Schema({
  divertedDisposalID: {
    type: Number,
    required: false
  },
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
  Unit: {
    type: String
  },
  supportingDocument: {
    type: String
  }
},
{timestamps:true}
);

// Create the model
const DivertedDisposal = mongoose.model('DivertedDisposal', DivertedDisposalSchema);

module.exports = DivertedDisposal;
