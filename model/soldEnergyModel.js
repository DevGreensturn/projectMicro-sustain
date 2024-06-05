const mongoose = require('mongoose');
const { Schema } = mongoose;

const soldEnergySchema = new Schema({
  soldEnergyId: {
    type: Number,
    required: true,
    unique: true
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
  readingDate: {
    type: Date
  },
  energyType: {
    type: String,
    enum: ['Electricity', 'Heating', 'Cooling', 'Steam']
  },
  soldEnergy: {
    type: Number
  },
  unit: {
    type: String,
    enum: ['kWh', 'Joule', 'Wh']
  },
  supportingDocument: {
    type: Buffer
  }
});

const SoldEnergy = mongoose.model('SoldEnergy', soldEnergySchema);

module.exports = SoldEnergy;
