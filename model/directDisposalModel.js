const mongoose = require('mongoose');

const directedDisposalSchema = new mongoose.Schema({
  directedDisposalID: {
    type: Number,
    required: false
  },
  wasteId: {
    type: mongoose.Types.ObjectId,
    ref:"wasteManagement",
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
  directedOperationType: {
    type: String,
    enum: [
      "Incineration with energy recovery",
      "Incineration without energy recovery",
      "Landfilling",
      "Others"
    ]
  },
  quantity: {
    type: Number
  },
  unit: {
    type: String
  },
  supportingDocument: {
    type: Buffer
  }
},
{timestamps:true}
);

const DirectedDisposal = mongoose.model('DirectedDisposal', directedDisposalSchema);

module.exports = DirectedDisposal;
