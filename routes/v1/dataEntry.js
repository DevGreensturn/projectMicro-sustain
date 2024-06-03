const router = require('express').Router();
const auth = require('../../middleware/authHandler');

const dataEntry = require('../../controller/dataEntryController');


router.post('/',dataEntry.createEnergyProvider) 
router.put('/:id',auth.authenticateToken,dataEntry.updateEnergyProvider);
router.get('/:id?',dataEntry.getEnergyProvider); 
router.delete('/:id',dataEntry.deleteEnergyProvider); 

module.exports = router;