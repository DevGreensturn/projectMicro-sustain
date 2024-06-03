const energyProvider = require("../model/utilityEnergyProviderModel");

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


module.exports = {
    createEnergyProvider,
    getEnergyProvider,
    updateEnergyProvider,
    deleteEnergyProvider
};
