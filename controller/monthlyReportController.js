const monthlyReport = require("../model/monthlyReportModel");

const getMonthlyData = async (req, res) => {
  const { id } = req.params;
  const { projectId ,packageId} = req.query;
  console.log(projectId);
  try {
    let result;
    if (id) {
      result = await monthlyReport.findOne({ _id: id }).populate({
        path: 'projectId',
        select: 'projectName' // Replace with the actual fields you want from the project collection
      })
      .populate({
        path: 'packageId',
        select: 'name' // Replace with the actual fields you want from the package collection
      })
      .populate({
        path: 'reportedBy',
        select: 'firstName lastName email' // Replace with the actual fields you want from the userDetails collection
      });
    } else if(projectId || packageId) {
      result = await monthlyReport.find({ projectId:projectId,packageId:packageId })
        .populate({
          path: 'projectId',
          select: 'projectName' // Replace with the actual fields you want from the project collection
        })
        .populate({
          path: 'packageId',
          select: 'name' // Replace with the actual fields you want from the package collection
        })
        .populate({
          path: 'reportedBy',
          select: 'firstName lastName email' // Replace with the actual fields you want from the userDetails collection
        });
    }else{
      result = await monthlyReport.find()
        .populate({
          path: 'projectId',
          select: 'projectName' // Replace with the actual fields you want from the project collection
        })
        .populate({
          path: 'packageId',
          select: 'name' // Replace with the actual fields you want from the package collection
        })
        .populate({
          path: 'reportedBy',
          select: 'firstName lastName email' // Replace with the actual fields you want from the userDetails collection
        });
    }
    return res.status(200).send({
      status: true,
      message: "Monthly Report Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const createMonthlyReport = async (req, res) => {
  try {
    const monthlyData = new monthlyReport(req.body);
    const result = await monthlyData.save();

    return res.status(201).send({
      status: true,
      message: "monthlyData is saved",
      response: result
    });
  } catch (error) {

    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const updateMonthlyReport = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await monthlyReport.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await monthlyReport.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Monthly Report Data updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteMonthlyReport = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await monthlyReport.findByIdAndUpdate(id, {$set:{safeDelete: true }}, { new: true });
    if (!data) {
      return res.status(404).send({
        status: false,
        message: "Data not found",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Data has been marked as deleted",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};



module.exports = {
  getMonthlyData,
  createMonthlyReport,
  updateMonthlyReport,
  deleteMonthlyReport
};
