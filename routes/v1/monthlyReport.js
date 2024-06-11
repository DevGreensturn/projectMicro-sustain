const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const monthlyReport = require('../../controller/monthlyReportController');

router.get("/:id?",auth.authenticateToken,monthlyReport.getMonthlyData);
router.post("/",auth.authenticateToken,monthlyReport.createMonthlyReport);

module.exports = router;