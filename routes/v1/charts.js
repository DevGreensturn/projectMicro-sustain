const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const chartsInstance = require('../../controller/chartsController');

router.post("/energy/pie",chartsInstance.energyPieConsumption);
router.post("/energy/line",chartsInstance.energyLineConsumption);

router.post("/water/pie",chartsInstance.waterPieConsumption);

router.post("/concrete/pie",chartsInstance.concretePieConsumption);

module.exports = router;