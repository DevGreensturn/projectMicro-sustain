const energyProvider = require("../model/utilityEnergyProviderModel");
const nonRenewable = require("../model/nonRenewableModel");
const renwableModel = require("../model/renewableModel");
const soldModel = require("../model/soldEnergyModel");
const reductionEnergyModel = require("../model/reductionEnergyModel");
const waterProviderModel = require("../model/utilityWaterProviderModel");
const bottleWaterModel = require("../model/bottleWaterModel");
const waterTankerModel = require("../model/waterTankerModel");
const concreteMixModel = require("../model/concreteModel");
const buildingSchemas = require("../model/buildingModel");
const wasteManagement = require("../model/wasteManagementModel");
const divertedModel = require("../model/divertedModel");
const disposaleModel = require("../model/directDisposalModel");
const workerTransportationModel = require("../model/workerTransportationModel");
const siteModel = require("../model/siteVehicleModel");
const businessModel = require("../model/businessTravelModel");
const commutingModel = require("../model/employeeCommutingModel");

const createEnergyProvider = async (req, res) => {
  try {
    const data = new energyProvider(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Created energy entry data saved",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};


const getEnergyProvider = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  try {
    let result;
    const query = {
      safeDelete: false, 
    };

    if (projectId) {
      query.projectId = projectId;
    }

    if (id) {
      result = await energyProvider.findOne({ _id: id, safeDelete: false });
      if (!result) {
        return res.status(404).send({
          status: false,
          message: "Data not found",
        });
      }
      return res.status(200).send({
        status: true,
        message: "Get Data",
        response: result,
      });
    } else {
      const skip = (page - 1) * limit;
      result = await energyProvider
        .find(query)
        .skip(skip)
        .limit(limit);
      const total_count = await energyProvider.countDocuments(query);
      return res.status(200).send({
        status: true,
        message: "Get Data with pagination",
        response: result,
        total_count: total_count,
        page: page,
        limit: limit,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateEnergyProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await energyProvider.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await energyProvider.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "package Data updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteEnergyProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await energyProvider.findByIdAndUpdate(id, {$set:{safeDelete: true }}, { new: true });
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


const createNonRenewable = async (req, res) => {
  try {
    const data = new nonRenewable(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Created energy entry data saved",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }

  
};
const getNonRenewable = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await nonRenewable.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await nonRenewable.find(query).skip(skip).limit(limit);
    }
    const total_count = await nonRenewable.countDocuments();

    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      total_count: total_count,
      limit: limit,
      page: page,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateNonRenewable = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await nonRenewable.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await nonRenewable.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "package Data updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteNonRenewable = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await nonRenewable.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//renewable Energy
const createRenewable = async (req, res) => {
  try {
    const data = new renwableModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getRenewable = async (req, res) => {
  let { id } = req.params;
  let { page, limit,projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;

    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await renwableModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await renwableModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await renwableModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
const updateRenewable = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await renwableModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await renwableModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteRenewable = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await renwableModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Sold
const createSoldEnergy = async (req, res) => {
  try {
    const data = new soldModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getSoldEnergy = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;

    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await soldModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await soldModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await soldModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateSoldEnergy = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await soldModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await soldModel.findByIdAndUpdate(id, req.body, options);
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteSoldEnergy = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await soldModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Reduction
const createReductionEnergy = async (req, res) => {
  try {
    const data = new reductionEnergyModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getReductionEnergy = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await reductionEnergyModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await reductionEnergyModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await reductionEnergyModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateReductionEnergy = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await reductionEnergyModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await reductionEnergyModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteReductionEnergy = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await reductionEnergyModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
//Water Provider
const createWaterProvider = async (req, res) => {
  try {
    const data = new waterProviderModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWaterProvider = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await waterProviderModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await waterProviderModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await waterProviderModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWaterProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await waterProviderModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await waterProviderModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteWaterProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await waterProviderModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(200).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Water Bottle
const createBottleWater = async (req, res) => {
  try {
    const data = new bottleWaterModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getBottleWater = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await bottleWaterModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await bottleWaterModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await bottleWaterModel.countDocuments();

    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateBottleWater = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await bottleWaterModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await bottleWaterModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteBottleWater = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await bottleWaterModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Water Bottle
const createWaterTanker = async (req, res) => {
  try {
    const data = new waterTankerModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWaterTanker = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await waterTankerModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await waterTankerModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await waterTankerModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWaterTanker = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await waterTankerModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await waterTankerModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteWaterTanker = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await waterTankerModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Concrete Mix
const createConcreteMix = async (req, res) => {
  try {
    const data = new concreteMixModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getConcreteMix = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await concreteMixModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await concreteMixModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await concreteMixModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateConcreteMix = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await concreteMixModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await concreteMixModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteConcreteMix = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await concreteMixModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Building-Materials
const createBuilding = async (req, res) => {
  try {
    const data = new buildingSchemas(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getBuilding = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await buildingSchemas.findOne({ _id: id, safeDelete: false })
        .populate({ path: 'supplierSubcontractor', select: 'name' });
    } else {
      const skip = (page - 1) * limit;
      result = await buildingSchemas.find(query)
      .populate({ path: 'supplierSubcontractor', select: 'name' })
        .skip(skip)
        .limit(limit);
    }
    const total_count = await buildingSchemas.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateBuilding = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await buildingSchemas.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await buildingSchemas.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await buildingSchemas.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Waste-Management
const createWasteManagement = async (req, res) => {
  try {
    const data = new wasteManagement(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWasteManagement = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
    safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await wasteManagement.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await wasteManagement.find(query).skip(skip).limit(limit);
    }
    const total_count = await wasteManagement.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWasteManagement = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await wasteManagement.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await wasteManagement.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteWasteManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await wasteManagement.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Direct-Disposal
const createDirectDisposal = async (req, res) => {
  try {
    const data = new disposaleModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getDirectDisposal = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await disposaleModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await disposaleModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await disposaleModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateDirectDisposal = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await disposaleModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await disposaleModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteDirectDisposal = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await disposaleModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Direct-Disposal
const createDivertedDisposal = async (req, res) => {
  try {
    const data = new divertedModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getDivertedDisposal = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await divertedModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await divertedModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await divertedModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateDivertedDisposal = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await divertedModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await divertedModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteDivertedDisposal = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await divertedModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Work - Transport
const createWorkerTransportation = async (req, res) => {
  try {
    const data = new workerTransportationModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWorkerTransportation = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await workerTransportationModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await workerTransportationModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await workerTransportationModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWorkerTransportation = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await workerTransportationModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await workerTransportationModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteWorkerTransportation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await workerTransportationModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Site-Vehicle
const createSiteVehicle = async (req, res) => {
  try {
    const data = new siteModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getSiteVehicle = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await siteModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await siteModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await siteModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateSiteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await siteModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await siteModel.findByIdAndUpdate(id, req.body, options);
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteSiteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await siteModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

//Site-Vehicle
const createBusinessTravel = async (req, res) => {
  try {
    const data = new siteModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getBusinessTravel = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await siteModel.findOne({ _id: id, safeDelete: false });
    } else {
      const skip = (page - 1) * limit;
      result = await siteModel.find(query).skip(skip).limit(limit);
    }
    const total_count = await siteModel.countDocuments();
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result,
      limit: limit,
      page: page,
      total_count: total_count,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateBusinessTravel = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await siteModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await siteModel.findByIdAndUpdate(id, req.body, options);
      return res.status(200).send({
        status: true,
        message: "Data has been updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteBusinessTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await businessModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};


// Create-Commuting
const createCommuting = async (req, res) => {
  try {
    const data = new commutingModel(req.body);
    const result = await data.save();

    return res.status(201).send({
      status: true,
      message: "Created energy entry data saved",
      response: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

const getCommuting = async (req, res) => {
  let { id } = req.params;
  let { page, limit, projectId } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  try {
    let result;
    const query = {
      safeDelete: false
    };

    // Check if projectId is provided in query parameters
    if (projectId) {
      query.projectId = projectId;
    }
    if (id) {
      result = await commutingModel.findOne({ _id: id, safeDelete: false });
      return res.status(200).send({
        status: true,
        message: "Get Data",
        response: result,
      });
    } else {
      const skip = (page - 1) * limit;
      result = await commutingModel.find(query).skip(skip).limit(limit);
      const total_count = await commutingModel.countDocuments();
      return res.status(200).send({
        status: true,
        message: "Get Data with pagination",
        response: result,
        total_count: total_count,
        page: page,
        limit: limit,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCommuting = async (req, res) => {
  try {
    const { id } = req.params;

    const options = { new: true };
    const findData = await commutingModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false });
    } else {
      const result = await commutingModel.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      return res.status(200).send({
        status: true,
        message: "package Data updated",
        response: result,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deleteCommuting = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await commutingModel.findByIdAndUpdate(id, {$set: {safeDelete: true}}, { new: true });
    return res.status(201).send({
      status: true,
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

module.exports = {
  createEnergyProvider,
  getEnergyProvider,
  updateEnergyProvider,
  deleteEnergyProvider,
  createRenewable,
  getRenewable,
  updateRenewable,
  deleteRenewable,
  createNonRenewable,
  getNonRenewable,
  updateNonRenewable,
  deleteNonRenewable,
  createSoldEnergy,
  getSoldEnergy,
  updateSoldEnergy,
  deleteSoldEnergy,
  createReductionEnergy,
  getReductionEnergy,
  updateReductionEnergy,
  deleteReductionEnergy,
  createWaterProvider,
  getWaterProvider,
  updateWaterProvider,
  deleteWaterProvider,
  createBottleWater,
  getBottleWater,
  updateBottleWater,
  deleteBottleWater,
  createWaterTanker,
  getWaterTanker,
  updateWaterTanker,
  deleteWaterTanker,
  createConcreteMix,
  getConcreteMix,
  updateConcreteMix,
  deleteConcreteMix,
  createBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding,
  createWasteManagement,
  getWasteManagement,
  updateWasteManagement,
  deleteWasteManagement,
  createDirectDisposal,
  getDirectDisposal,
  updateDirectDisposal,
  deleteDirectDisposal,
  createDivertedDisposal,
  getDivertedDisposal,
  updateDivertedDisposal,
  deleteDivertedDisposal,
  createWorkerTransportation,
  getWorkerTransportation,
  updateWorkerTransportation,
  deleteWorkerTransportation,
  createSiteVehicle,
  getSiteVehicle,
  updateSiteVehicle,
  deleteSiteVehicle,
  createBusinessTravel,
  getBusinessTravel,
  updateBusinessTravel,
  deleteBusinessTravel,
  createCommuting,
  getCommuting,
  updateCommuting,
  deleteCommuting,
};
