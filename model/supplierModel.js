const mongoose = require('mongoose');
const package = require("../model/packageModel");
const project = require("../model/projectModel");
// Define the schema
const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  type: {
    type: String,
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
  roleId: {
    type: mongoose.Types.ObjectId,
    ref:"userroles",
    default:null,
    required: true
  },
  status: {
    type:String,
    default:"ACTIVE",
    required: false
  },
},
{timestamps:true}
);

const EndUser = mongoose.model('supplier', supplierSchema);

module.exports = EndUser;
