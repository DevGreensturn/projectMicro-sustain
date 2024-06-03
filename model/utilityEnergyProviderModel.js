const mongoose = require('mongoose');

const energyUtilityProviderSchema = new mongoose.Schema({
  energyUtilityProviderID: {
    type: Number,
    required: false,
    unique: false
  },
  packageID: {
    type: mongoose.Types.ObjectId,
    ref:"package",
    required: false
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref:"project",
    required: false
  },
  reportID: {
    type: mongoose.Types.ObjectId,
    ref:"monthlyReport",
    required: false
  },
  energyConsumptionID: {
    type: Number,
    required: false
  },
  energyType: {
    type: String,
    enum: ['ELECTRICITY', 'HEATING', 'COOLING', 'STEAM'],
  },
  meterNo: {
    type: Number,
    required:false
  },
  accountNo: {
    type: Number,
    required:false
  },
  serviceProvider: {
    type: String,
    required:false
  },
  readingDate: {
    type: Date,
    required:false
  },
  meterReading: {
    type: Number,
    required:false
  },
  consumption: {
    type: Number,
    required:false
  },
  unit: {
    type: String,
    enum: ['kWh', 'Joule', 'Wh']
  },
  supportingDocuments: [{
    type: String,
    required:false
  }]
},{timestamps:true}
);

const EnergyUtilityProvider = mongoose.model('energyUtilityProvider', energyUtilityProviderSchema);

module.exports = EnergyUtilityProvider;
