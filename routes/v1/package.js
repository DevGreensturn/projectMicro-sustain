const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const package = require('../../controller/packageController');

router.post("/",auth.authenticateToken,  package.createPackage);
router.get("/:id?",package.getPackageData);
router.put("/:id",auth.authenticateToken,  package.updatePackages);

module.exports = router;