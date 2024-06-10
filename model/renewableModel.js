const mongoose = require('mongoose');

const energyRenewableSchema = new mongoose.Schema({
  energyRenewableId: {
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
  type: {
    type: String,
    enum: ['Biomass', 'Geothermal', 'Hydro', 'Solar', 'Wind'],
    required: true
  },
  source: {
    type: String,
    required: false
  },
  consumption: {
    type: Number,
    required: false
  },
  unit: {
    type: String,
    enum: ['kWh', 'Joule', 'Wh'],
    required: false
  }
},{timestamps:true}
);

const EnergyRenewable = mongoose.model('EnergyRenewable', energyRenewableSchema);

module.exports = EnergyRenewable;
