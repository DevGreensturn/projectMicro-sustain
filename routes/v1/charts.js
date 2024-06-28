const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const chartsInstance = require('../../controller/chartsController');

router.post("/energy/pie",chartsInstance.energyPieConsumption);
router.post("/energy/line",chartsInstance.energyLineConsumption);


router.post("/water/pie",chartsInstance.waterPieConsumption);
router.post("/water/line",chartsInstance.waterLineConsumption)

router.post("/concrete/pie",chartsInstance.concretePieConsumption);

router.post("/building/pie", chartsInstance.buildingMaterialPieConsumption);
router.post("/building/line", chartsInstance.buildingMaterialLineConsumption);
router.post("/building-material/line", chartsInstance.materialPurchasedTypeLine)
router.post("/directed-disposal/pie", chartsInstance.directedDisposalPie);
router.post("/diverted/pie", chartsInstance.divertedDisposalPie)

// FUEL CONSUMPTION
router.post("/transportation/pie", chartsInstance.transportationFuelPie)
router.post("/fuel-consumption/pie",chartsInstance.fuelConsumptionPie)
router.post("/tansporatation/line", chartsInstance.transportationFuelLine)

// WASTE MANAGEMENT
router.post("/waste-solid/line", chartsInstance.solidWasteLine);
router.post("/waste-liquid/line",chartsInstance.liquidWasteLine);
router.post("/waste-directed/line", chartsInstance.solidWasteDirectedLine)
router.post("/waste-diverted/line", chartsInstance.wastDivertedLine)
router.post("/concrete/line", chartsInstance.concreteLineChart);
router.post("/total-waste/pie", chartsInstance.totalWastePie);
router.post("/total-waste/line", chartsInstance.totalWasteLineChart)

module.exports = router;