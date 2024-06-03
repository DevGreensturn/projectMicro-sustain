const packageModel = require("../model/packageModel");

const createPackage = async (req, res) => {
  try {
    const { name } = req.body;
    if(!name) {
      return res.status(400).send({
        status: false,
        message: "Please provide package name",
        response: null
      });
    }
    let isPackageExist = await packageModel.findOne({"name": name.toUpperCase()}).lean()
     if(isPackageExist) {
      return res.status(400).send({status: false,message: "Package already exists",response: null});
    }
    const packages = new packageModel(req.body);
    const result = await packages.save();
   
    return res.status(201).send({
      status: true,
      message: "Package Data saved",
      response: result
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

const getPackageData = async (req, res) => {
  let {id} = req.params;
  try {
    let packages;
    if(id){
      packages = await packageModel.findById(id);
    }else{
      packages = await packageModel.find();
    }
    return res.status(200).send({
      status: true,
      message: "Package Data",
      response: packages
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePackages = async (req, res) => {
  try {
    const id = req.params.id;

    const options = { new: true };
    const findpackage = await packageModel.findById(id);
    if (!findpackage) {
      return res.status(404).send({ message: "data not found", status: false })
    } else {
      const result = await packageModel.findByIdAndUpdate(id, req.body, options);
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


module.exports = {
  createPackage,
  getPackageData,
  updatePackages
};
