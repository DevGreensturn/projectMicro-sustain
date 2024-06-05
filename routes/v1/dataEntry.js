const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const dataEntry = require('../../controller/dataEntryController');

// ENERGY
router.post('/energy/',dataEntry.createEnergyProvider) 
router.put('/energy/:id',auth.authenticateToken,dataEntry.updateEnergyProvider);
router.get('/energy/:id?',dataEntry.getEnergyProvider); 
router.delete('/energy/:id',dataEntry.deleteEnergyProvider); 

// RENEWABLE
router.post('/renewable/',auth.authenticateToken,dataEntry.createRenewable) 
router.put('/renewable/:id',auth.authenticateToken,dataEntry.updateRenewable);
router.get('/renewable/:id?',auth.authenticateToken,dataEntry.getRenewable); 
router.delete('/renewable/:id',auth.authenticateToken,dataEntry.deleteRenewable); 

// NON-RENEWABLE
router.post('/non-renewable',auth.authenticateToken,dataEntry.createNonRenewable) 
router.put('/non-renewable/:id',auth.authenticateToken,dataEntry.updateNonRenewable);
router.get('/non-renewable/:id?',auth.authenticateToken,dataEntry.getNonRenewable); 
router.delete('/non-renewable/:id',auth.authenticateToken,dataEntry.deleteNonRenewable); 

// SOLD
router.post('/sold',auth.authenticateToken,dataEntry.createSoldEnergy) 
router.put('/sold/:id',auth.authenticateToken,dataEntry.updateSoldEnergy);
router.get('/sold/:id?',auth.authenticateToken,dataEntry.getSoldEnergy); 
router.delete('/sold/:id',auth.authenticateToken,dataEntry.deleteSoldEnergy); 

// REDUCTION
router.post('/reduction',auth.authenticateToken,dataEntry.createReductionEnergy) 
router.put('/reduction/:id',auth.authenticateToken,dataEntry.updateReductionEnergy);
router.get('/reduction/:id?',auth.authenticateToken,dataEntry.getReductionEnergy); 
router.delete('/reduction/:id',auth.authenticateToken,dataEntry.deleteReductionEnergy); 

// WATER-PROVIDER
router.post('/water-provider',auth.authenticateToken,dataEntry.createWaterProvider) 
router.put('/water-provider/:id',auth.authenticateToken,dataEntry.updateWaterProvider);
router.get('/water-provider/:id?',auth.authenticateToken,dataEntry.getWaterProvider); 
router.delete('/water-provider/:id',auth.authenticateToken,dataEntry.deleteWaterProvider); 

module.exports = router;