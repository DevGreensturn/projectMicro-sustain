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
const divertedModel = require("../model/divertedModel");
const disposaleModel = require("../model/directDisposalModel");
const workerTransportationModel = require("../model/workerTransportationModel");
const siteModel = require("../model/siteVehicleModel");
const businessModel = require("../model/businessTravelModel");
const commutingModel = require("../model/employeeCommutingModel");
const energyConsumption = async (req, res) => {
  // Uncomment and use if you need to filter by date or month
  let { dateRange } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth()+1;
    const year = timestampsDate.getFullYear();
    let query = {}; // Define your query if needed, currently empty to match all documents
    if(date){
      query = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, month] },
            { $eq: [{ $year: "$createdAt" }, year] }
          ]
        }
      };
    }
    
    // Define the aggregation pipeline
    const pipeline = [
      {
        $match: query
      },
      {
        $project: {
          consumption: 1 // Project `consumption` as is in `energyProvider`
        }
      },
      {
        $unionWith: {
          coll: "EnergyRenewable",
          pipeline: [
            {
              $match: query
            },
            {
              $project: {
                consumption: 1 // Project `consumption` as is in `EnergyRenewable`
              }
            }
          ]
        }
      },
      {
        $unionWith: {
          coll: "EnergyNonRenewable",
          pipeline: [
            {
              $match: query
            },
            {
              $project: {
                consumption: "$energyOutput" // Project `energyOutput` as `consumption` in `EnergyNonRenewable`
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$consumption" }
        }
      }
    ];

    // Run the aggregation
    const result = await energyProvider.aggregate(pipeline);

    // Log and return the result
    console.log(result, "result");return
    // return res.status(200).send({
    //   status: true,
    //   message: "Energy Consumption",
    //   result: result
    // });
  } catch (error) {
    console.error(error);
    // return res.status(500).send({ error: error.message });
  }
};

// energyConsumption();

module.exports ={
  energyConsumption
}
