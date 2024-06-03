const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const projects = require('../../controller/projectController');

router.post("/",auth.authenticateToken, projects.createProject);
router.get("/:id?",auth.authenticateToken,projects.getProjectData);
router.put("/:id",auth.authenticateToken, projects.updateProject);

module.exports = router;