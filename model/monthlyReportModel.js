const mongoose = require('mongoose');
const userDetails = require("../model/endUserModel");
const package = require("../model/packageModel");
const project = require("../model/projectModel");

const reportSchema = new mongoose.Schema({
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
  emissionInputId: {
    type: Number,
    required: false
  },
  reportingMonthYear: {
    type: String,
    required: false
  },
  packagesProgressThisMonth: {
    type: String,
    required: false
  },
  manhourDuringThisMonth: {
    type: String,
    required: false
  },
  overallPackagesProgress: {
    type: String,
    required: false
  },
  cumulativeManhour: {
    type: String,
    required: false
  },
  reportedBy: {
    type:  mongoose.Types.ObjectId,
    ref:userDetails,
    required: false
  },
  reportStatus: {
    type: String,
    enum: ['Draft', 'Submitted', 'Audited', 'Approved','Returned'],
    required: false
  },
  approvedByDeveloper:{
    type:mongoose.Types.ObjectId,
    ref:userDetails,
    required: false
  },
  returnWithComment:{
    type: String,
  },
  safeDelete:{
    type: Boolean,
    default:false
  }
},{timestamps:true}
);

const Report = mongoose.model('monthlyReport', reportSchema);

module.exports = Report;
