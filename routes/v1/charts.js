const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const chartsInstance = require('../../controller/chartsController');

router.post("/energy/pie",chartsInstance.energyPieConsumption);
router.post("/energy/line",chartsInstance.energyPieConsumption);

module.exports = router;