const { ObjectId } = require("mongodb");
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
  let { dateRange, projectId, interval, unit, packageId } = req.body;
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
          totalConsumption: 1, // Include the totalConsumption
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
  let { dateRange, projectId, interval, unit, packageId } = req.body;
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
        case "Litre":
          return 1; // Liters is the base unit
        case "USGallon":
          return 0.264172; // 1 Liter = 0.264172 US Gallons
        case "CubicMeter":
          return 0.001; // 1 Liter = 0.001 Cubic Meters
        default:
          return 1; // Default to Liters if unit is not specified
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
          _id: "$materialType",
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

const buildingMaterialLineConsumption = async (req, res) => {
  let { projectId, interval, packageId } = req.body;

  try {
    let matchQuery = { projectId: new ObjectId(projectId) };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

    console.log("Match Query:", JSON.stringify(matchQuery, null, 2));

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
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

    console.log("Group ID:", JSON.stringify(groupId, null, 2));

    const pipeline = [
      { $match: matchQuery },
      {
        $group: {
          _id: { materialSource: "$materialSource", ...groupId },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.materialSource",
          total: { $sum: "$count" },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$total" },
          sources: {
            $push: {
              materialSource: "$_id",
              total: "$total",
              details: "$details",
            },
          },
        },
      },
      {
        $unwind: "$sources",
      },
      {
        $project: {
          materialSource: "$sources.materialSource",
          percentage: {
            $multiply: [
              { $divide: ["$sources.total", "$totalDocuments"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { materialSource: 1 },
      },
    ];

    console.log("Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));

    const result = await buildingModel.aggregate(pipeline);
    console.log("Aggregation Result:", result);

    return res.status(200).json({
      status: true,
      message: "Building Material Percentage by Source over Time",
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: false });
  }
};

const materialPurchasedTypeLine = async (req, res) => {
  let { projectId, interval, packageId } = req.body;
  try {
    let matchQuery = { projectId: new ObjectId(projectId) };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }
    console.log("Match Query:", JSON.stringify(matchQuery, null, 2));

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
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
    console.log("Group ID:", JSON.stringify(groupId, null, 2));

    const pipeline = [
      { $match: matchQuery },
      {
        $group: {
          _id: { materialType: "$materialType", ...groupId },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.materialType",
          total: { $sum: "$count" },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$total" },
          sources: { $push: { materialType: "$_id", total: "$total" } },
        },
      },
      {
        $unwind: "$sources",
      },
      {
        $project: {
          materialType: "$sources.materialType",
          percentage: {
            $multiply: [
              { $divide: ["$sources.total", "$totalDocuments"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { materialType: 1 },
      },
    ];
    console.log("Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));

    const result = await buildingModel.aggregate(pipeline);
    console.log("Aggregation Result:", result);

    return res.status(200).json({
      status: true,
      message: "Building Material Percentage by Source over Time",
      interval: interval,
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: false });
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

    const projectIdd = new ObjectId(projectId);
    const packageIdd = new ObjectId(packageId);

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

    const modelsData = [
      { model: siteModel, field: "fuelConsumption" },
      { model: buildingModel, field: "fuelUsed" },
      { model: concreteMixModel, field: "fuelUsedPerTruck" },
      { model: waterTankerModel, field: "fuelUsedByTruck" },
      { model: workerTransportationModel, field: "fuelConsumption" },
      { model: commutingModel, field: "fuelUsed" },
      { model: nonRenewable, field: "fuelUsedByTrucks" }
    ];

    const promises = modelsData.map(async ({ model, field }) => {
      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: null,
            totalFuelUsed: { $sum: `$${field}` },
          },
        },
      ];

      console.log(`Executing pipeline for ${model.collection.name} with query:`, JSON.stringify(pipeline));

      const result = await model.aggregate(pipeline);
      const totalFuelUsed = result.length ? result[0].totalFuelUsed : 0;

      console.log(`Result for ${model.collection.name}:`, result);

      return {
        model: model.collection.name,
        totalFuelUsed,
      };
    });

    const fuelConsumptions = await Promise.all(promises);

    const totalFuelUsed = fuelConsumptions.reduce(
      (acc, curr) => acc + curr.totalFuelUsed,
      0
    );

    const fuelPercentage = fuelConsumptions.map((fc) => ({
      source_type: fc.model,
      percentage: totalFuelUsed > 0
        ? ((fc.totalFuelUsed / totalFuelUsed) * 100).toFixed(2)
        : 0,
    }));

    return res.status(200).send({
      status: true,
      message: "Fuel consumption percentage by model",
      result: fuelPercentage,
    });
  } catch (error) {
    console.error("Error in transportationFuelPie:", error);
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

    const modelsData = [
      { model: siteModel, field: "fuelConsumption" },
      { model: buildingModel, field: "fuelUsed" },
      { model: concreteMixModel, field: "fuelUsedPerTruck" },
      { model: waterTankerModel, field: "fuelUsedByTruck" },
      { model: workerTransportationModel, field: "fuelConsumption" },
      { model: commutingModel, field: "fuelUsed" },
    ];

    // Step 1: Calculate the total transportation fuel used
    const transportationPromises = modelsData.map(async ({ model, field }) => {
      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: null,
            totalFuelUsed: { $sum: `$${field}` },
          },
        },
      ];

      const result = await model.aggregate(pipeline);
      const totalFuelUsed = result.length ? result[0].totalFuelUsed : 0;

      return {
        model: model.collection.name,
        totalFuelUsed,
      };
    });

    const transportationFuelConsumptions = await Promise.all(transportationPromises);

    const totalTransportationFuelUsed = transportationFuelConsumptions.reduce(
      (acc, curr) => acc + curr.totalFuelUsed,
      0
    );

    // Step 2: Get unique equipment types from nonRenewable model and calculate their fuel usage
    const equipmentTypes = await nonRenewable.distinct("equipment", query);

    const equipmentPromises = equipmentTypes.map(async (type) => {
      const pipeline = [
        { $match: { ...query, equipment: type } },
        {
          $group: {
            _id: null,
            totalFuelUsed: { $sum: "$fuelUsed" },
          },
        },
      ];

      const result = await nonRenewable.aggregate(pipeline);
      const totalFuelUsedForType = result.length ? result[0].totalFuelUsed : 0;

      return {
        equipment: type,
        totalFuelUsed: totalFuelUsedForType,
      };
    });

    const equipmentFuelConsumptions = await Promise.all(equipmentPromises);

    // Step 3: Calculate the total fuel used (transportation + equipment types)
    const totalFuelUsed = totalTransportationFuelUsed + equipmentFuelConsumptions.reduce(
      (acc, curr) => acc + curr.totalFuelUsed,
      0
    );

    // Step 4: Calculate the percentages
    const transportationPercentage = totalTransportationFuelUsed ? ((totalTransportationFuelUsed / totalFuelUsed) * 100).toFixed(2) : 0;
    
    const equipmentPercentages = equipmentFuelConsumptions.reduce((acc, { equipment, totalFuelUsed }) => {
      const percentage = totalFuelUsed ? ((totalFuelUsed / totalFuelUsed) * 100).toFixed(2) : 0;
      acc[equipment] = `${percentage}%`;
      return acc;
    }, {});

    return res.status(200).send({
      status: true,
      message: "Fuel consumption percentage by type",
      totalFuelUsed,
      percentages: {
        Transportation_fuel: `${transportationPercentage}%`,
        ...equipmentPercentages,
      },
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

const solidWasteLine = async (req, res) => {
  let { projectId, packageId, interval } = req.body;
  try {
    let matchQuery = { projectId: new ObjectId(projectId), wasteType: "solid" };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
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

    const pipeline = [
      { $match: matchQuery },
      {
        $group: {
          _id: { directedOperationType: "$directedOperationType", ...groupId },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $group: {
          _id: null,
          totalOverallQuantity: { $sum: "$totalQuantity" },
          data: {
            $push: {
              directedOperationType: "$_id.directedOperationType",
              year: "$_id.year",
              month: "$_id.month",
              quarter: "$_id.quarter",
              totalQuantity: "$totalQuantity",
            },
          },
        },
      },
      { $unwind: "$data" },
      {
        $project: {
          _id: 0,
          directedOperationType: "$data.directedOperationType",
          totalQuantity: "$data.totalQuantity",
          percentage: {
            $multiply: [
              { $divide: ["$data.totalQuantity", "$totalOverallQuantity"] },
              100,
            ],
          },
        },
      },
      {
        $sort: {
          year: 1,
          quarter: 1,
          month: 1,
          directedOperationType: 1,
        },
      },
    ];

    const results = await disposaleModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Solid Waste Consumption",
      data: results,
      interval: interval,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const liquidWasteLine = async (req, res) => {
  let { projectId, packageId, interval } = req.body;
  try {
    let matchQuery = {
      projectId: new ObjectId(projectId),
      wasteType: "liquid",
    };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
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

    const pipeline = [
      { $match: matchQuery },
      {
        $group: {
          _id: { directedOperationType: "$directedOperationType", ...groupId },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $group: {
          _id: "$_id",
          totalQuantity: { $sum: "$totalQuantity" },
        },
      },
      {
        $group: {
          _id: null,
          totalOverallQuantity: { $sum: "$totalQuantity" },
          data: {
            $push: {
              directedOperationType: "$_id.directedOperationType",
              year: "$_id.year",
              month: "$_id.month",
              quarter: "$_id.quarter",
              totalQuantity: "$totalQuantity",
            },
          },
        },
      },
      { $unwind: { path: "$data", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          directedOperationType: "$data.directedOperationType",
          totalQuantity: { $ifNull: ["$data.totalQuantity", 0] },
          percentage: {
            $multiply: [
              {
                $cond: [
                  { $eq: ["$totalOverallQuantity", 0] },
                  0,
                  { $divide: ["$data.totalQuantity", "$totalOverallQuantity"] },
                ],
              },
              100,
            ],
          },
        },
      },
      {
        $sort: {
          year: 1,
          quarter: 1,
          month: 1,
          directedOperationType: 1,
        },
      },
    ];

    const results = await disposaleModel.aggregate(pipeline);

    return res.status(200).send({
      status: true,
      message: "Liquid Waste Consumption",
      data: results,
      interval: interval,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const wastDivertedLine = async (req, res) => {
  let { projectId, interval, unit, packageId } = req.body;
  
  try {
    let matchQuery ={}
     matchQuery = {
      projectId: new ObjectId(projectId),
    };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }
    // Build the match query based on projectId and packageId
    // let matchQuery = { projectId: projectId, packageId: packageId };
    let groupId;

    // Determine the grouping ID based on the interval
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
        return res.status(400).send({ status: false, message: "Invalid interval specified" });
    }

    // Define the unit conversion factor based on the unit
    const unitConversionFactor = (unit) => {
      switch (unit) {
        case "tonnes":
          return 1;
        case "kg":
          return 1000;
        case "lbs":
          return 2204.62;
        default:
          return 1; // Default to tonnes if unit is not specified
      }
    };

    // Define the aggregation pipeline
    const conversionPipeline = (consumptionField) => [
      { $match: matchQuery },
      {
        $project: {
          createdAt: 1,
          wasteType: 1,
          divertedOperationType: 1,
          quantityInDesiredUnit: {
            $divide: [
              {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ["$unit", "tonnes"] },
                      then: `$${consumptionField}`,
                    },
                    {
                      case: { $eq: ["$unit", "kg"] },
                      then: { $divide: [`$${consumptionField}`, 1000] },
                    },
                    {
                      case: { $eq: ["$unit", "lbs"] },
                      then: { $divide: [`$${consumptionField}`, 2204.62] },
                    },
                    {
                      case: { $eq: ["$unit", null] },
                      then: `$${consumptionField}`,
                    }, // Default to tonnes if unit is missing
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
          _id: { groupId, divertedOperationType: "$divertedOperationType" },
          totalQuantity: { $sum: "$quantityInDesiredUnit" },
        },
      },
      {
        $group: {
          _id: "$_id.groupId",
          results: {
            $push: {
              divertedOperationType: "$_id.divertedOperationType",
              totalQuantity: "$totalQuantity",
            },
          },
          totalGroupQuantity: { $sum: "$totalQuantity" },
        },
      },
      {
        $unwind: "$results",
      },
      {
        $project: {
          _id: 0, // Hide the default _id field
          result: "$_id",
          divertedOperationType: "$results.divertedOperationType",
          totalQuantity: "$results.totalQuantity",
          percentage: {
            $multiply: [
              { $divide: ["$results.totalQuantity", "$totalGroupQuantity"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { "result.year": 1, "result.month": 1, "result.quarter": 1 },
      },
    ];

    // Run the aggregation pipeline
    const liquidDiverted = await divertedModel.aggregate(conversionPipeline("quantity"));

    // Send the response
    const totalDivertedLIne = liquidDiverted.length > 0 ? liquidDiverted : [];
    return res.status(200).send({
      status: true,
      message: "Diverted chart",
      totalDivertedLIne,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};




const solidWasteDirectedLine = async (req, res) => {
  let { projectId, packageId, interval } = req.body;
  try {
    let matchQuery = {
      projectId: new ObjectId(projectId),
      wasteType: "liquid",
    };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
        };
        break;
      case "yearly":
        groupId = { year: { $year: "$createdAt" } };
        break;
      default:
        return res.status(400).send({ status: false, message: "Invalid interval specified" });
    }

    const pipeline = [
      { $match: matchQuery }, 
      {
        $group: {
          _id: {
            ...groupId,
            directedOperationType: "$directedOperationType",
          },
          count: { $sum: 1 } 
        }
      },
      {
        $group: {
          _id: groupId,
          types: {
            $push: {
              type: "$_id.directedOperationType",
              count: "$count"
            }
          },
          totalCount: { $sum: "$count" }
        }
      },
      {
        $unwind: "$types"
      },
      {
        $project: {
          // _id: 0,
          // interval: "$_id",
          directedOperationType: "$types.type",
          count: "$types.count",
          totalCount: 1,
          percentage: { $multiply: [{ $divide: ["$types.count", "$totalCount"] }, 100] }
        }
      }
    ];

    const results = await disposaleModel.aggregate(pipeline);

    console.log("Aggregation results:", results);

    return res.status(200).json({
      status: true,
      message: "Solid Waste Directed Operation Type Percentages",
      data: results.map(result => ({
        directedOperationType: result.directedOperationType,
        count: result.count,
        percentage: result.percentage,
        interval: interval
      }))
    });
  } catch (error) {
    console.error("Error in solidWasteDirectedLine:", error);
    return res.status(500).json({ error: error.message, status: false });
  }
};


const transportationFuelLine = async (req, res) => {
  let { projectId, packageId, interval } = req.body;
  try {
    let matchQuery = {
      projectId: new ObjectId(projectId),
      packageId: new ObjectId(packageId)
    };

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
          quarter: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
        };
        break;
      case "yearly":
        groupId = { year: { $year: "$createdAt" } };
        break;
      default:
        return res.status(400).json({ status: false, message: "Invalid interval specified" });
    }

    const models = [
      siteModel,
      buildingModel,
      concreteMixModel,
      waterTankerModel,
      workerTransportationModel,
      commutingModel,
      siteModel,
      businessModel
    ];

    const pipeline = [
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalFuelUsed: { $sum: "$fuelUsed" }
        }
      },
      {
        $project: {
          _id: 0,
          totalFuelUsed: 1
        }
      }
    ];

    let fuelConsumptionPromises = models.map(async (model) => {
      const result = await model.aggregate(pipeline);
      return {
        model: model.collection.name,
        totalFuelUsed: result.length ? result[0].totalFuelUsed : 0
      };
    });

    let fuelConsumptions = await Promise.all(fuelConsumptionPromises);
    let totalFuelUsed = fuelConsumptions.reduce((acc, curr) => acc + curr.totalFuelUsed, 0);

    let result = fuelConsumptions.map(fc => ({
      model: fc.model,
      percentage: totalFuelUsed > 0 ? 
        ((fc.totalFuelUsed / totalFuelUsed) * 100).toFixed(2) : 
        "0.00"
    }));

    return res.status(200).json({
      status: true,
      message: "Fuel consumption percentage by model",
      result: result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: false });
  }
};

const concreteLineChart = async (req, res) => {
  let { projectId, interval, unit, packageId } = req.body;
  
  try {
    let matchQuery = {
      projectId: new ObjectId(projectId),
    };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

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
        return res.status(400).send({ status: false, message: "Invalid interval specified" });
    }

    const unitConversionFactor = (unit) => {
      switch (unit) {
        case "cubic meter":
          return 1;
        case "cubic feet":
          return 1000;
        case "cubic yards":
          return 2204.62;
        default:
          return 1;
      }
    };

    const conversionPipeline = () => [
      { $match: matchQuery },
      {
        $project: {
          createdAt: 1,
          wasteType: 1,
          type: 1,
          quantityInDesiredUnit: {
            $divide: [
              {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ["$unit", "cubic meter"] },
                      then: "$quantity", // Assuming quantity field is present
                    },
                    {
                      case: { $eq: ["$unit", "cubic feet"] },
                      then: { $divide: ["$quantity", 1000] },
                    },
                    {
                      case: { $eq: ["$unit", "cubic yards"] },
                      then: { $divide: ["$quantity", 2204.62] },
                    },
                    {
                      case: { $eq: ["$unit", null] },
                      then: "$quantity",
                    },
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
          _id: { groupId, type: "$type" },
          totalQuantity: { $sum: "$quantityInDesiredUnit" },
        },
      },
      {
        $group: {
          _id: "$_id.groupId",
          results: {
            $push: {
              type: "$_id.type",
              totalQuantity: "$totalQuantity",
            },
          },
          totalGroupQuantity: { $sum: "$totalQuantity" },
        },
      },
      {
        $unwind: "$results",
      },
      {
        $project: {
          _id: 0,
          result: "$_id",
          type: "$results.type",
          totalQuantity: "$results.totalQuantity",
          percentage: {
            $multiply: [
              { $divide: ["$results.totalQuantity", "$totalGroupQuantity"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { "result.year": 1, "result.month": 1, "result.quarter": 1 },
      },
    ];

    const totalConcrete = await concreteMixModel.aggregate(conversionPipeline());

    const totalConcretePercentage = totalConcrete.length > 0 ? totalConcrete : [];
    return res.status(200).send({
      status: true,
      message: "Diverted chart",
      totalConcretePercentage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const totalWastePie = async (req, res) => {
  let { dateRange, projectId, packageId } = req.body;
  try {
    const timestampsDate = new Date(dateRange);
    const month = timestampsDate.getMonth() + 1;
    const year = timestampsDate.getFullYear();
    console.log(month, year);
    
    let query = { projectId: new ObjectId(projectId) };

    if (packageId) {
      query.packageId = new ObjectId(packageId);
    }

    if (month && year) {
      query = {
        ...query,
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, month] },
            { $eq: [{ $year: "$createdAt" }, year] },
          ],
        },
      };
    } else if (year) {
      query = {
        ...query,
        $expr: {
          $and: [{ $eq: [{ $year: "$createdAt" }, year] }],
        },
      };
    } else if (month) {
      query = {
        ...query,
        $expr: {
          $and: [{ $eq: [{ $month: "$createdAt" }, month] }],
        },
      };
    }

    const conversionPipeline = () => [
      { $match: query },
      {
        $group: {
          _id: null,
          totalConsumption: { $sum: "$quantity" },
        },
      },
    ];

    const [divertedData, directedData] = await Promise.all([
      divertedModel.aggregate(conversionPipeline()),
      disposaleModel.aggregate(conversionPipeline()),
    ]);

    const totalDiverted = divertedData[0]?.totalConsumption || 0;
    const totalDirected = directedData[0]?.totalConsumption || 0;

    const totalWaste = totalDiverted + totalDirected;

    const divertedPercentage = totalWaste > 0 ? (totalDiverted / totalWaste) * 100 : 0;
    const directedPercentage = totalWaste > 0 ? (totalDirected / totalWaste) * 100 : 0;

    return res.status(200).send({
      status: true,
      message: "Total waste",
      divertedPercentage,
      directedPercentage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};
const totalWasteLineChart = async (req, res) => {
  let { projectId, interval, packageId } = req.body;

  try {
    let matchQuery = { projectId: new ObjectId(projectId) };
    if (packageId) {
      matchQuery.packageId = new ObjectId(packageId);
    }

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
        return res.status(400).send({ status: false, message: "Invalid interval specified" });
    }

    const conversionPipeline = (model) => [
      { $match: matchQuery },
      {
        $group: {
          _id: groupId,
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ];

    const divertedPipeline = divertedModel.aggregate(conversionPipeline(divertedModel));
    const directedPipeline = disposaleModel.aggregate(conversionPipeline(disposaleModel));

    const [divertedData, directedData] = await Promise.all([divertedPipeline, directedPipeline]);

    const combinedData = {};

    for (const data of divertedData) {
      const key = JSON.stringify(data._id);
      if (!combinedData[key]) {
        combinedData[key] = { _id: data._id, diverted: 0, directed: 0 };
      }
      combinedData[key].diverted += data.totalQuantity;
    }

    for (const data of directedData) {
      const key = JSON.stringify(data._id);
      if (!combinedData[key]) {
        combinedData[key] = { _id: data._id, diverted: 0, directed: 0 };
      }
      combinedData[key].directed += data.totalQuantity;
    }

    const result = Object.values(combinedData).map((entry) => {
      const total = entry.diverted + entry.directed;
      return {
        _id: entry._id,
        diverted: entry.diverted,
        directed: entry.directed,
        divertedPercentage: total > 0 ? (entry.diverted / total) * 100 : 0,
        directedPercentage: total > 0 ? (entry.directed / total) * 100 : 0,
      };
    });

    return res.status(200).send({
      status: true,
      message: "Waste line chart",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message, status: false });
  }
};

const buildingMaterialTypePie = async (req, res) => {
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
          _id: "$materialType",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: "$count" },
          details: { $push: { materialType: "$_id", count: "$count" } },
        },
      },
      {
        $unwind: "$details",
      },
      {
        $project: {
          materialType: "$details.materialType",
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
      message: "Building Material Consumption by Type",
      result: result,
    });
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
  buildingMaterialLineConsumption,
  divertedDisposalPie,
  directedDisposalPie,
  transportationFuelPie,
  fuelConsumptionPie,
  contrunctionEmissionPie,
  transportationEmissionPie,
  materialPurchasedTypeLine,
  solidWasteLine,
  liquidWasteLine,
  wastDivertedLine,
  solidWasteDirectedLine,
  transportationFuelLine,
  concreteLineChart,
  totalWastePie,
  totalWasteLineChart,
  buildingMaterialTypePie
};
