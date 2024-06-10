const energyProvider = require("../model/utilityEnergyProviderModel");
const nonRenewable = require("../model/nonRenewableModel");
const renwableModel = require("../model/renewableModel");
const soldModel = require("../model/soldEnergyModel");
const reductionEnergyModel = require("../model/reductionEnergyModel");
const waterProviderModel = require("../model/utilityWaterProviderModel");
const bottleWaterModel = require("../model/bottleWaterModel");
const waterTankerModel = require("../model/waterTankerModel");
const concreteMixModel = require("../model/concreteModel");
const buildingModel = require("../model/buildingModel");
const wasteManagement = require("../model/wasteManagementModel");


const createEnergyProvider = async (req, res) => {
  try {

    const data = new energyProvider(req.body);
    const result = await data.save();
   
    return res.status(201).send({
      status: true,
      message: "Created energy entry data saved",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getEnergyProvider = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await energyProvider.findById(id);
    }else{
      result = await energyProvider.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateEnergyProvider = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await energyProvider.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await energyProvider.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await energyProvider.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
      });
    } catch (error) {
      
      return res.status(500).send({ message: error.message, success: 0 });
    }
};

const createNonRenewable = async (req, res) => {
  try {

    const data = new NonRenewable(req.body);
    const result = await data.save();
   
    return res.status(201).send({
      status: true,
      message: "Created energy entry data saved",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getNonRenewable = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await nonRenewable.findById(id);
    }else{
      result = await nonRenewable.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateNonRenewable = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await nonRenewable.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await nonRenewable.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await nonRenewable.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getRenewable = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await renwableModel.findById(id);
    }else{
      result = await renwableModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateRenewable = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await renwableModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await renwableModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await renwableModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getSoldEnergy = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await soldModel.findById(id);
    }else{
      result = await soldModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateSoldEnergy = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await soldModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
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
  const {id} = req.params;
      const data = await soldModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getReductionEnergy = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await reductionEnergyModel.findById(id);
    }else{
      result = await reductionEnergyModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateReductionEnergy = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await reductionEnergyModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await reductionEnergyModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await reductionEnergyModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWaterProvider = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await waterProviderModel.findById(id);
    }else{
      result = await waterProviderModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWaterProvider = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await waterProviderModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await waterProviderModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await waterProviderModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getBottleWater = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await bottleWaterModel.findById(id);
    }else{
      result = await bottleWaterModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateBottleWater = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await bottleWaterModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await bottleWaterModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await bottleWaterModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWaterTanker = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await waterTankerModel.findById(id);
    }else{
      result = await waterTankerModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWaterTanker = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await waterTankerModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await waterTankerModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await waterTankerModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getConcreteMix = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await concreteMixModel.findById(id);
    }else{
      result = await concreteMixModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateConcreteMix = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await concreteMixModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await concreteMixModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await concreteMixModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
      });
    } catch (error) {
      
      return res.status(500).send({ message: error.message, success: 0 });
    }
};

//Building-Materials
const createBuilding = async (req, res) => {
  try {
    const data = new buildingModel(req.body);
    const result = await data.save();
   
    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getBuilding = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await buildingModel.findById(id);
    }else{
      result = await buildingModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateBuilding = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await buildingModel.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await buildingModel.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await buildingModel.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
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
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getWasteManagement = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await wasteManagement.findById(id);
    }else{
      result = await wasteManagement.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateWasteManagement = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await wasteManagement.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await wasteManagement.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await wasteManagement.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
      });
    } catch (error) {
      
      return res.status(500).send({ message: error.message, success: 0 });
    }
};

//Direct-Disposal
const createDirectDisposal = async (req, res) => {
  try {
    const data = new wasteManagement(req.body);
    const result = await data.save();
   
    return res.status(201).send({
      status: true,
      message: "Record has been created",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};
const getDirectDisposal = async (req, res) => {
  let {id} = req.params;
  try {
    let result;
    if(id){
      result = await wasteManagement.findById(id);
    }else{
      result = await wasteManagement.find();
    }
    return res.status(200).send({
      status: true,
      message: "Get Data",
      response: result
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateDirectDisposal = async (req, res) => {
  try {
    const {id} = req.params;

    const options = { new: true };
    const findData = await wasteManagement.findById(id);
    if (!findData) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await wasteManagement.findByIdAndUpdate(id, req.body, options);
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
  const {id} = req.params;
      const data = await wasteManagement.findByIdAndDelete(id)
      return res.status(201).send({
        status: true,
        message: "Data has been deleted successfully"
      });
    } catch (error) {
      
      return res.status(500).send({ message: error.message, success: 0 });
    }
};


module.exports = {
    createEnergyProvider,getEnergyProvider,updateEnergyProvider,deleteEnergyProvider,
    createRenewable,getRenewable,updateRenewable,deleteRenewable,
    createNonRenewable,getNonRenewable,updateNonRenewable,deleteNonRenewable,
    createSoldEnergy,getSoldEnergy,updateSoldEnergy,deleteSoldEnergy,
    createReductionEnergy,getReductionEnergy,updateReductionEnergy,deleteReductionEnergy,
    createWaterProvider,getWaterProvider,updateWaterProvider,deleteWaterProvider,
    createBottleWater,getBottleWater,updateBottleWater,deleteBottleWater,
    createWaterTanker,getWaterTanker,updateWaterTanker,deleteWaterTanker,
    createConcreteMix,getConcreteMix,updateConcreteMix,deleteConcreteMix,
    createBuilding,getBuilding,updateBuilding,deleteBuilding,
    createWasteManagement,getWasteManagement,updateWasteManagement,deleteWasteManagement,
    createDirectDisposal,getDirectDisposal,updateDirectDisposal,deleteDirectDisposal
};
