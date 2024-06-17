const mongoose = require("mongoose");

const factorSchema = new mongoose.connect(
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
