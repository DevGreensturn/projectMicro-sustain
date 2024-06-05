const mongoose = require('mongoose');

const energyNonRenewableSchema = new mongoose.Schema({
  energyNonRenewableId: {
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
  energyConsumptionId: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Diesel']
  },
  equipment: {
    type: String,
    enum: ['Equipment', 'Generator', 'Others']
  },
  unit: {
    type: String,
    enum: ['US Gallon', 'Litre', 'Cubic Meter']
  },
  totalSpending: {
    type: Number
  },
  supportingDocument: {
    type: Buffer
  },
  noOfTrips: {
    type: Number
  },
  fuelUsedByTrucks: {
    type: Number
  }
});

const EnergyNonRenewable = mongoose.model('EnergyNonRenewable', energyNonRenewableSchema);

module.exports = EnergyNonRenewable;
