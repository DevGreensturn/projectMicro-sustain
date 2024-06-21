//
const { ObjectId } = require("mongodb"); // Import ObjectId from MongoDB driver
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

const energyPieConsumption = async (req, res) => {
  // Uncomment and use if you need to filter by date or month
  let { dateRange, projectId } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();
    console.log(month, year);
    let query = { projectId: projectId }; // Define your query if needed, currently empty to match all documents
    if (month && year) {
      query = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, month] },
            { $eq: [{ $year: "$createdAt" }, year] },
          ],
        },
      };
    }
    if (year) {
      query = {
        $expr: {
          $and: [{ $eq: [{ $year: "$createdAt" }, year] }],
        },
      };
    }
    if (month) {
      query = {
        $expr: {
          $and: [{ $eq: [{ $month: "$createdAt" }, month] }],
        },
      };
    }
    /* total of thrice tables data
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
*/
    //
    const conversionPipeline = (consumptionField) => [
      { $match: query },
      {
        $project: {
          consumptionInJoules: {
            $switch: {
              // branches: [
              //   { case: { $eq: ["$unit", "Kwh"] }, then: { $multiply: [`$${consumptionField}`, 3600000] } },
              //   { case: { $eq: ["$unit", "Wh"] }, then: { $multiply: [`$${consumptionField}`, 3600] } },
              //   { case: { $eq: ["$unit", "Joule"] }, then: `$${consumptionField}` },
              //   { case: { $eq: ["$unit", null] }, then: { $multiply: [`$${consumptionField}`, 3600000] } } // Default to kWh if unit is missing

              // ],
              //In KWH
              branches: [
                {
                  case: { $eq: ["$unit", "Kwh"] },
                  then: `$${consumptionField}`,
                },
                {
                  case: { $eq: ["$unit", "Wh"] },
                  then: { $divide: [`$${consumptionField}`, 1000] },
                },
                {
                  case: { $eq: ["$unit", "Joule"] },
                  then: { $divide: [`$${consumptionField}`, 3600000] },
                },
                {
                  case: { $eq: ["$unit", null] },
                  then: `$${consumptionField}`,
                }, // Default to kWh if unit is missing
              ],
              default: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalConsumption: { $sum: "$consumptionInJoules" },
        },
      },
    ];

    const [
      renewableConsumption,
      nonRenewableConsumption,
      providerEnergyConsumption,
    ] = await Promise.all([
      renwableModel.aggregate(conversionPipeline("consumption")),
      nonRenewable.aggregate(conversionPipeline("energyOutput")),
      energyProvider.aggregate(conversionPipeline("consumption")),
    ]);

    const totalRenewableConsumption =
      renewableConsumption.length > 0
        ? renewableConsumption[0].totalConsumption
        : 0;
    const totalNonRenewableConsumption =
      nonRenewableConsumption.length > 0
        ? nonRenewableConsumption[0].totalConsumption
        : 0;
    const totalProviderEnergyConsumption =
      providerEnergyConsumption.length > 0
        ? providerEnergyConsumption[0].totalConsumption
        : 0;

    console.log(
      totalNonRenewableConsumption,
      "totalNonRenewableConsumption",
      totalProviderEnergyConsumption,
      "totalProviderEnergyConsumption",
      totalRenewableConsumption,
      "totalRenewableConsumption"
    );
    const totalEnergyConsumption =
      totalRenewableConsumption +
      totalNonRenewableConsumption +
      totalProviderEnergyConsumption;

    // Log and return the result
    // console.log(result, "result");
    const renewablePercentage =
      totalEnergyConsumption > 0
        ? (totalRenewableConsumption / totalEnergyConsumption) * 100
        : 0;
    const nonRenewablePercentage =
      totalEnergyConsumption > 0
        ? (totalNonRenewableConsumption / totalEnergyConsumption) * 100
        : 0;
    const providerPercentage =
      totalEnergyConsumption > 0
        ? (totalProviderEnergyConsumption / totalEnergyConsumption) * 100
        : 0;

    console.log(`Renewable Consumption: ${renewablePercentage.toFixed(2)}%`);
    console.log(
      `Non-Renewable Consumption: ${nonRenewablePercentage.toFixed(2)}%`
    );
    console.log(
      `Provider Energy Consumption: ${providerPercentage.toFixed(2)}%`
    );
    return res.status(200).send({
      status: true,
      message: "Energy Consumption",
      renewablePercentage: renewablePercentage,
      nonRenewablePercentage: nonRenewablePercentage,
      providerPercentage: providerPercentage,
      totalNonRenewableConsumption: totalNonRenewableConsumption,
      totalProviderEnergyConsumption: totalProviderEnergyConsumption,
      totalRenewableConsumption: totalRenewableConsumption,

      // result: result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const energyLineConsumption = async (req, res) => {
  let { dateRange, projectId, interval, unit } = req.body;
  try {
    let matchQuery = { projectId: projectId, packageId: packageId };
    let groupId;

    switch (interval) {
      case "monthly":
        groupId = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        };
        break;
      case "quarterly":
        groupId = {
          year: { $year: "$createdAt" },
          quarter: {
            $ceil: { $divide: [{ $month: "$createdAt" }, 3] },
          },
        };
        break;
      case "yearly":
        groupId = { year: { $year: "$createdAt" } };
        break;
      default:
        return res
          .status(400)
          .send({ status: false, message: "Invalid interval specified" });
    }

    const unitConversionFactor = (unit) => {
      switch (unit) {
        case "Kwh":
          return 1; // kWh is the base unit
        case "Wh":
          return 1000; // 1 kWh = 1000 Wh
        case "Joule":
          return 3600000; // 1 kWh = 3600000 Joules
        default:
          return 1; // Default to kWh if unit is not specified
      }
    };

    const conversionPipeline = (consumptionField) => [
      { $match: matchQuery },
      {
        $project: {
          createdAt: 1,
          consumptionInDesiredUnit: {
            $divide: [
              {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ["$unit", "Kwh"] },
                      then: `$${consumptionField}`,
                    },
                    {
                      case: { $eq: ["$unit", "Wh"] },
                      then: { $divide: [`$${consumptionField}`, 1000] },
                    },
                    {
                      case: { $eq: ["$unit", "Joule"] },
                      then: { $divide: [`$${consumptionField}`, 3600000] },
                    },
                    {
                      case: { $eq: ["$unit", null] },
                      then: `$${consumptionField}`,
                    }, // Default to kWh if unit is missing
                  ],
                  default: 0,
                },
              },
              unitConversionFactor(unit),
            ],
          },
        },
      },
      {
        $group: {
          _id: groupId,
          totalConsumption: { $sum: "$consumptionInDesiredUnit" },
        },
      },
      {
        $project: {
          _id: 0, // Hide the default _id field
          result: "$_id", // Rename _id to newIdName
          totalConsumption: 1, // Include the totalConsumption field
        },
      },
    ];

    const [
      renewableConsumption,
      nonRenewableConsumption,
      providerEnergyConsumption,
    ] = await Promise.all([
      renwableModel.aggregate(conversionPipeline("consumption")),
      nonRenewable.aggregate(conversionPipeline("energyOutput")),
      energyProvider.aggregate(conversionPipeline("consumption")),
    ]);

    const totalRenewableConsumption =
      renewableConsumption.length > 0 ? renewableConsumption : [];
    const totalNonRenewableConsumption =
      nonRenewableConsumption.length > 0 ? nonRenewableConsumption : [];
    const totalProviderEnergyConsumption =
      providerEnergyConsumption.length > 0 ? providerEnergyConsumption : [];

    return res.status(200).send({
      status: true,
      message: "Energy Consumption",
      totalNonRenewableConsumption,
      totalProviderEnergyConsumption,
      totalRenewableConsumption,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const waterPieConsumption = async (req, res) => {
  // Uncomment and use if you need to filter by date or month
  let { dateRange, projectId } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();
    console.log(month, year);
    let query = { projectId: projectId }; // Define your query if needed, currently empty to match all documents
    if (month && year) {
      query = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, month] },
            { $eq: [{ $year: "$createdAt" }, year] },
          ],
        },
      };
    }
    if (year) {
      query = {
        $expr: {
          $and: [{ $eq: [{ $year: "$createdAt" }, year] }],
        },
      };
    }
    if (month) {
      query = {
        $expr: {
          $and: [{ $eq: [{ $month: "$createdAt" }, month] }],
        },
      };
    }
    /* total of thrice tables data
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
*/
    //
    const conversionPipeline = (consumptionField) => [
      { $match: query },
      {
        $project: {
          consumptionInJoules: {
            $switch: {
              // branches: [
              //   { case: { $eq: ["$unit", "Kwh"] }, then: { $multiply: [`$${consumptionField}`, 3600000] } },
              //   { case: { $eq: ["$unit", "Wh"] }, then: { $multiply: [`$${consumptionField}`, 3600] } },
              //   { case: { $eq: ["$unit", "Joule"] }, then: `$${consumptionField}` },
              //   { case: { $eq: ["$unit", null] }, then: { $multiply: [`$${consumptionField}`, 3600000] } } // Default to kWh if unit is missing

              // ],
              //In KWH
              branches: [
                {
                  case: { $eq: ["$unit", "Kwh"] },
                  then: `$${consumptionField}`,
                },
                {
                  case: { $eq: ["$unit", "Wh"] },
                  then: { $divide: [`$${consumptionField}`, 1000] },
                },
                {
                  case: { $eq: ["$unit", "Joule"] },
                  then: { $divide: [`$${consumptionField}`, 3600000] },
                },
                {
                  case: { $eq: ["$unit", null] },
                  then: `$${consumptionField}`,
                }, // Default to kWh if unit is missing
              ],
              default: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalConsumption: { $sum: "$consumptionInJoules" },
        },
      },
    ];

    const [bottleConsumption, waterProviderConsumption] = await Promise.all([
      bottleWaterModel.aggregate(conversionPipeline("consumption")),
      waterProviderModel.aggregate(conversionPipeline("energyOutput")),
    ]);

    const totalBottleConsumption =
      bottleConsumption.length > 0 ? bottleConsumption[0].totalConsumption : 0;
    const totalWaterProviderConsumption =
      waterProviderConsumption.length > 0
        ? waterProviderConsumption[0].totalConsumption
        : 0;

    console.log(
      totalWaterProviderConsumption,
      "totalNonRenewableConsumption",
      totalBottleConsumption,
      "totalProviderEnergyConsumption"
    );
    const totalWaterConsumption =
      totalBottleConsumption + totalWaterProviderConsumption;

    // Log and return the result
    // console.log(result, "result");
    const bottlePercentage =
      totalBottleConsumption > 0
        ? (totalBottleConsumption / totalWaterConsumption) * 100
        : 0;
    const waterPercentage =
      totalWaterProviderConsumption > 0
        ? (totalWaterProviderConsumption / totalWaterConsumption) * 100
        : 0;

    console.log(`Renewable Consumption: ${bottlePercentage.toFixed(2)}%`);
    console.log(`Non-Renewable Consumption: ${waterPercentage.toFixed(2)}%`);

    return res.status(200).send({
      status: true,
      message: "Energy Consumption",
      bottlePercentage: bottlePercentage,
      waterPercentage: waterPercentage,
      totalBottleConsumption: totalBottleConsumption,
      totalWaterConsumption: totalWaterConsumption,

      // result: result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const waterLineConsumption = async (req, res) => {
  let { dateRange, projectId, interval, unit } = req.body;
  try {
    let matchQuery = { projectId: projectId, packageId: packageId };
    let groupId;

    switch (interval) {
      case "monthly":
        groupId = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        };
        break;
      case "quarterly":
        groupId = {
          year: { $year: "$createdAt" },
          quarter: {
            $ceil: { $divide: [{ $month: "$createdAt" }, 3] },
          },
        };
        break;
      case "yearly":
        groupId = { year: { $year: "$createdAt" } };
        break;
      default:
        return res
          .status(400)
          .send({ status: false, message: "Invalid interval specified" });
    }

    const unitConversionFactor = (unit) => {
      switch (unit) {
        case "Kwh":
          return 1; // kWh is the base unit
        case "Wh":
          return 1000; // 1 kWh = 1000 Wh
        case "Joule":
          return 3600000; // 1 kWh = 3600000 Joules
        default:
          return 1; // Default to kWh if unit is not specified
      }
    };

    const conversionPipeline = (consumptionField) => [
      { $match: matchQuery },
      {
        $project: {
          createdAt: 1,
          consumptionInDesiredUnit: {
            $divide: [
              {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ["$unit", "Kwh"] },
                      then: `$${consumptionField}`,
                    },
                    {
                      case: { $eq: ["$unit", "Wh"] },
                      then: { $divide: [`$${consumptionField}`, 1000] },
                    },
                    {
                      case: { $eq: ["$unit", "Joule"] },
                      then: { $divide: [`$${consumptionField}`, 3600000] },
                    },
                    {
                      case: { $eq: ["$unit", null] },
                      then: `$${consumptionField}`,
                    }, // Default to kWh if unit is missing
                  ],
                  default: 0,
                },
              },
              unitConversionFactor(unit),
            ],
          },
        },
      },
      {
        $group: {
          _id: groupId,
          totalConsumption: { $sum: "$consumptionInDesiredUnit" },
        },
      },
      {
        $project: {
          _id: 0, // Hide the default _id field
          result: "$_id", // Rename _id to newIdName
          totalConsumption: 1, // Include the totalConsumption field
        },
      },
    ];

    const [
      renewableConsumption,
      nonRenewableConsumption,
      providerEnergyConsumption,
    ] = await Promise.all([
      renwableModel.aggregate(conversionPipeline("consumption")),
      nonRenewable.aggregate(conversionPipeline("energyOutput")),
      energyProvider.aggregate(conversionPipeline("consumption")),
    ]);

    const totalRenewableConsumption =
      renewableConsumption.length > 0 ? renewableConsumption : [];
    const totalNonRenewableConsumption =
      nonRenewableConsumption.length > 0 ? nonRenewableConsumption : [];
    const totalProviderEnergyConsumption =
      providerEnergyConsumption.length > 0 ? providerEnergyConsumption : [];

    return res.status(200).send({
      status: true,
      message: "Energy Consumption",
      totalNonRenewableConsumption,
      totalProviderEnergyConsumption,
      totalRenewableConsumption,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const concretePieConsumption = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();
    console.log(month, year);
    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };

    // Adjust the query based on the date range
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    // Define the aggregation pipeline
    const pipeline = [
      {
        $match: query,
      },
      {
        $group: {
          _id: "$type",
          totalVolume: { $sum: "$volume" },
        },
      },
      {
        $group: {
          _id: null,
          totalVolumes: { $sum: "$totalVolume" },
          details: { $push: { type: "$_id", totalVolume: "$totalVolume" } },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          type: "$details.type",
          totalVolume: "$details.totalVolume",
          percentage: {
            $multiply: [
              { $divide: ["$details.totalVolume", "$totalVolumes"] },
              100,
            ],
          },
        },
      },
    ];

    // Run the aggregation
    const result = await concreteMixModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Concrete Consumption",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const buildingMaterialPieConsumption = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();
    console.log(month, year);
    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [
      {
        $match: query,
      },
      {
        $group: {
          _id: "$materialSource",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$count" },
          details: { $push: { materialSource: "$_id", count: "$count" } },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          materialSource: "$details.materialSource",
          percentage: {
            $multiply: [
              { $divide: ["$details.count", "$totalDocuments"] },
              100,
            ],
          },
        },
      },
    ];
    const result = await buildingModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Building Material Consumption by Source",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const divertedDisposalPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    const query = { projectId: projectIdd, packageId: packageIdd };

    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [
      {
        $match: query,
      },
      {
        $group: {
          _id: "$divertedOperationType",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$count" },
          details: {
            $push: { divertedOperationType: "$_id", count: "$count" },
          },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          divertedOperationType: "$details.divertedOperationType",
          percentage: {
            $multiply: [
              { $divide: ["$details.count", "$totalDocuments"] },
              100,
            ],
          },
        },
      },
    ];

    const result = await divertedModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Diverted disposal consumption by source",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const directedDisposalPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [
      {
        $match: query,
      },
      {
        $group: {
          _id: "$directedOperationType",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$count" },
          details: {
            $push: { directedOperationType: "$_id", count: "$count" },
          },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          directedOperationType: "$details.directedOperationType",
          percentage: {
            $multiply: [
              { $divide: ["$details.count", "$totalDocuments"] },
              100,
            ],
          },
        },
      },
    ];

    const result = await disposaleModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Directed disposal consumption by source",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const transportationFuelPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const models = [
      siteModel,
      buildingModel,
      concreteMixModel,
      waterTankerModel,
      workerTransportationModel,
      commutingModel,
      siteModel,
      businessModel,
    ];

    let fuelConsumptionPromises = models.map(async (model) => {
      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: null,
            totalFuelUsed: { $sum: "$fuelUsed" },
          },
        },
      ];

      const result = await model.aggregate(pipeline);
      return {
        model: model.collection.name,
        totalFuelUsed: result.length ? result[0].totalFuelUsed : 0,
      };
    });

    let fuelConsumptions = await Promise.all(fuelConsumptionPromises);
    let totalFuelUsed = fuelConsumptions.reduce((acc, curr) => acc + curr.totalFuelUsed, 0);

    let fuelPercentage = fuelConsumptions.map((fc) => ({
      model: fc.model,
      percentage: ((fc.totalFuelUsed / totalFuelUsed) * 100).toFixed(2),
    }));

    return res.status(200).send({
      status: true,
      message: "Fuel consumption percentage by model",
      result: fuelPercentage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};


const fuelConsumptionPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [
      {
        $match: query,
      },
      {
        $group: {
          _id: "$equipment",
          totalFuelUsed: { $sum: "$energyOutput" }
        },
      },
      {
        $group: {
          _id: null,
          totalFuel: { $sum: "$totalFuelUsed" },
          details: {
            $push: { equipment: "$_id", totalFuelUsed: "$totalFuelUsed" },
          },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          equipment: "$details.equipment",
          percentage: {
            $multiply: [
              { $divide: ["$details.totalFuelUsed", "$totalFuel"] },
              100,
            ],
          },
        },
      },
    ];

    const result = await nonRenewable.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Fuel consumption percentage by equipment type",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};


const contrunctionEmissionPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [];
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const transportationEmissionPie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;

  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();

    let projectIdd = new ObjectId(projectId);
    let packageIdd = new ObjectId(packageId);

    let query = { projectId: projectIdd, packageId: packageIdd };
    if (month && year) {
      query.$expr = {
        $and: [
          { $eq: [{ $month: "$createdAt" }, month] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      };
    } else if (year) {
      query.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    } else if (month) {
      query.$expr = {
        $eq: [{ $month: "$createdAt" }, month],
      };
    }

    const pipeline = [];
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

module.exports = {
  energyPieConsumption,
  energyLineConsumption,
  waterPieConsumption,
  waterLineConsumption,
  concretePieConsumption,
  buildingMaterialPieConsumption,
  divertedDisposalPie,
  directedDisposalPie,
  transportationFuelPie,
  fuelConsumptionPie,
  contrunctionEmissionPie,
  transportationEmissionPie,
};
