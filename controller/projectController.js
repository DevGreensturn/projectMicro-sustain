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
    return res.status(500).send({ message: error.message, success: 0 });
  }
};


const getProjectData = async (req, res) => {
  let { id } = req.params;
  let { limit, page, projectPackageId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  try {
    let result;
    const query = {};

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
        .populate("projectPackageId");
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

module.exports = {
  createProject,
  getProjectData,
  updateProject,
};
