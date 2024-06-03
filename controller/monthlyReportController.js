const monthlyReport = require("../model/monthlyReportModel");

const getMonthlyData = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await monthlyReport.findById(id).populate("projectId");
    }else{
      result = await monthlyReport.find();
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
