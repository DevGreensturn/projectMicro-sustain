const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  PackageID: {
    type: mongoose.Types.ObjectId,
    ref:"package",
    required: false
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref:"project",
    required: false
  },
  ReportingMonthYear: {
    type: String,
    required: false
  },
  PackagesProgressThisMonth: {
    type: String,
    required: false
  },
  ManhourDuringThisMonth: {
    type: String,
    required: false
  },
  OverallPackagesProgress: {
    type: String,
    required: false
  },
  CumulativeManhour: {
    type: String,
    required: false
  },
  ReportedBy: {
    type: String,
    required: false
  },
  ReportStatus: {
    type: String,
    enum: ['Draft', 'Submitted', 'Audited', 'Approved'],
    required: false
  }
},{timestamps:true}
);

const Report = mongoose.model('monthlyReport', reportSchema);

module.exports = Report;
