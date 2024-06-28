const mongoose = require("mongoose");

const factorSchema = new mongoose.Schema(
  {
    sourceName: {
      type: String,
      required: true,
    },
    factor: {
      type: String,
      required: true,
      default: "1",
    },
    method: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Factors = mongoose.model('factors', factorSchema);

module.exports = Factors;