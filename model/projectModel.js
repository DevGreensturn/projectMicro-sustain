const mongoose = require('mongoose');
const package = require("../model/packageModel");

// Define the schema
const projectSchema = new mongoose.Schema({
  referenceNo: {
    type: Number,
    required: false
  },
  projectName: {
    type: String,
    required: false
  },
  projectPackageId: {
    type: mongoose.Types.ObjectId,
    ref:package,
    required: false
  },
  mainContractor: {
    type: String,
    required: false
  },
  topology: {
    type: String,
    required: false
  },
  packageCurrentProgress: {
    type: String,
    required: false
  },
  plotArea: {
    type:String,
    required: false
  },
  gfa: {
    type:String,
    required: false
  },
  roadLength: {
    type:String,
    required: false,
    enum:[
      "8 km", "8-20 km", "more than 20 km"
    ]
  },
  infrastructure: {
    type:String,
    required: false,
    enum: [
      "100 ha", "100 - 250 ha", "more than 250 ha"
    ]
  },
  SubscriptionCategory: {
    type: String,
    enum: [
      "Building",
      "Road",
      "Infrastructure"
    ],
    required: false
  },
  subscriptionTier: {
    type:String,
    required: false,
    
  },
  cumulativeManhour: {
    type: String,
    required: false
  },
  SustainabilityRating: {
    type: String,
    required: false
  },
  safeDelete:{
    type: Boolean
  }
},
{timestamps:true}
);

// Create a model from the schema
const project = mongoose.model('project', projectSchema);

module.exports = project;
