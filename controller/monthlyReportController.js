const monthlyReport = require("../model/monthlyReportModel");

const getMonthlyData = async (req, res) => {
  const {id} = req.params;
  const {projectId} = req.query;
  console.log(projectId);
  try {
    let result;
    if(id){
      result = await monthlyReport.findOne({_id:id}).populate({
        path:"projectId",
        path:"packageId",
        path:"reportedBy",
      });
    }else{
      result = await monthlyReport.find({projectId:projectId}).populate({
        path:"projectId",
        path:"packageId",
        path:"reportedBy",
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



module.exports = {
  getMonthlyData
};
