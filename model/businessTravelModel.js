const mongoose = require('mongoose');
const monthlyReport = require("./monthlyReportModel");
const package = require("./packageModel");
const project = require("./projectModel");

const travelSchema = new mongoose.Schema({
  travelId: {
    type: Number,
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
    required: false
  },
  numberOfTravellersByAirplane: {
    type: Number,
    required: false
  },
  distanceTravelledByOneTraveller: {
    type: Number,
    required: false
  },
  safeDelete:{
    type: Boolean
  }
}, { timestamps: true });

const Travel = mongoose.model('travelBusiness', travelSchema);

module.exports = Travel;
