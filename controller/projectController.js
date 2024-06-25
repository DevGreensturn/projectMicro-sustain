const projectModel = require("../model/projectModel");

const createProject = async (req, res) => {
  try {
    const projects = new projectModel(req.body);
    const result = await projects.save();

    return res.status(201).send({
      status: true,
      message: "Project Data saved",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0,status:false });
  }
};


const getProjectData = async (req, res) => {
  let { id } = req.params;
  let { limit, page, projectPackageId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  try {
    let result;
    const query = {safeDelete:false};

    // Check if projectPackageId is provided in query parameters
    if (projectPackageId) {
      query.projectPackageId = projectPackageId;
    }

    if (id) {
      result = await projectModel.findById(id).populate("projectPackageId");
    } else {
      const skip = (page - 1) * limit;
      result = await projectModel
        .find(query)  // Apply the query here
        .skip(skip)
        .limit(limit)
        .populate("projectPackageId")
        .sort({createdAt:-1});
    }

    const total_count = await projectModel.countDocuments(query);

    return res.status(200).send({
      status: true,
      message: "Project Data",
      page_no: page,
      limit: limit,
      total_count: total_count,
      response: result,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findProject = await projectModel.findById(id);
    if (!findProject) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await projectModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
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
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project by id
    const findProject = await projectModel.findById(id);

    // If project not found, send 404 response
    if (!findProject) {
      return res.status(404).send({ message: "Project not found", status: false });
    }

    // Update the project to set safeDelete to true
    const options = { new: true };
    const result = await projectModel.findByIdAndUpdate(id, { $set: { safeDelete: true } }, options);

    // Send the response with the updated project
    return res.status(200).send({
      status: true,
      message: "Project has been deleted",
      response: result,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error deleting project:", error); // Logging the error
    return res.status(500).send({ message: error.message, status: false });
  }
};


module.exports = {
  createProject,
  getProjectData,
  updateProject,
  deleteProject
};
