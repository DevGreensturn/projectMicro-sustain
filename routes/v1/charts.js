const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const chartsInstance = require('../../controller/chartsController');

router.post("/energy/pie",chartsInstance.energyPieConsumption);
router.post("/energy/line",chartsInstance.energyLineConsumption);

router.post("/water/pie",chartsInstance.waterPieConsumption);

router.post("/concrete/pie",chartsInstance.concretePieConsumption);
router.post("/building/Pie", chartsInstance.buildingMaterialPieConsumption)
router.post("/directed-disposal/pie", chartsInstance.directedDisposalPie);
router.post("/diverted/pie", chartsInstance.divertedDisposalPie)

// FUEL CONSUMPTION
router.post("/transportation/pie", chartsInstance.transportationFuelPie)
router.post("/fuel-consumption/pie",chartsInstance.fuelConsumptionPie)

module.exports = router;