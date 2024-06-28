const router = require('express').Router();
const { createFactors } = require('../../controller/factorController');
const auth = require('../../middleware/authHandler');

router.post("/factorEntry", auth.authenticateToken, createFactors);

module.exports = router;