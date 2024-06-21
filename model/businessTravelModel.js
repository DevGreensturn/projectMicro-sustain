const mongoose = require('mongoose');
const monthlyReport = require("./monthlyReportModel");
const package = require("./packageModel");
const project = require("./projectModel");

const travelSchema = new mongoose.Schema({

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
    type: Boolean,
    default:false
  },
}, { timestamps: true });

const Travel = mongoose.model('travelBusiness', travelSchema);

module.exports = Travel;
