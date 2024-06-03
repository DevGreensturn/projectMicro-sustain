const projectModel = require("../model/projectModel");

const createProject = async (req, res) => {
  try {

    const projects = new projectModel(req.body);
    const result = await projects.save();
   
    return res.status(201).send({
      status: true,
      message: "Project Data saved",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

const getProjectData = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await projectModel.findById(id).populate("projectPackageId");
    }else{
      result = await projectModel.find().populate("projectPackageId");
    }
    return res.status(200).send({
      status: true,
      message: "Project Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findProject = await projectModel.findById(id);
    if (!findProject) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await projectModel.findByIdAndUpdate(id, req.body, options);
      return res.status(200).send({
        status: true,
        message: "Project Data updated",
        response: result,
      });
    }
  } catch (error) {
    
    return res.status(500).send({ message: error.message });
  }
};


module.exports = {
  createProject,
  getProjectData,
  updateProject
};
