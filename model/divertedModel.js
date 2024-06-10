const mongoose = require('mongoose');

// Define the schema
const DivertedDisposalSchema = new mongoose.Schema({
  divertedDisposalID: {
    type: Number,
    required: false
  },
  wasteID: {
    type: Number,
    required: true
  },
  packageID: {
    type: Number,
    required: true
  },
  reportID: {
    type: Number,
    required: true
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
