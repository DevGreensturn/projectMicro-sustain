const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
  reportingMonthYear: {
    type: String,
    required: false
  },
  ReportStatusackagesProgressThisMonth: {
    type: String,
    required: false
  },
  manhourDuringThisMonth: {
    type: String,
    required: false
  },
  OverallPackagesProgress: {
    type: String,
    required: false
  },
  cumulativeManhour: {
    type: String,
    required: false
  },
  reportedBy: {
    type:  mongoose.Types.ObjectId,
    ref:"userDetails",
    required: false
  },
  reportStatus: {
    type: String,
    enum: ['Draft', 'Submitted', 'Audited', 'Approved'],
    required: false
  }
},{timestamps:true}
);

const Report = mongoose.model('monthlyReport', reportSchema);

module.exports = Report;
