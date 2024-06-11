// const router = require('express').Router();
// const auth = require('../../middleware/authHandler');
// const dataEntry = require('../../controller/dataEntryController');

// // ENERGY
// router.post('/energy/',dataEntry.createEnergyProvider) 
// router.put('/energy/:id',auth.authenticateToken,dataEntry.updateEnergyProvider);
// router.get('/energy/:id?',dataEntry.getEnergyProvider); 
// router.delete('/energy/:id',dataEntry.deleteEnergyProvider); 

// // RENEWABLE
// router.post('/renewable/',auth.authenticateToken,dataEntry.createRenewable) 
// router.put('/renewable/:id',auth.authenticateToken,dataEntry.updateRenewable);
// router.get('/renewable/:id?',auth.authenticateToken,dataEntry.getRenewable); 
// router.delete('/renewable/:id',auth.authenticateToken,dataEntry.deleteRenewable); 

// // NON-RENEWABLE
// router.post('/non-renewable',auth.authenticateToken,dataEntry.createNonRenewable) 
// router.put('/non-renewable/:id',auth.authenticateToken,dataEntry.updateNonRenewable);
// router.get('/non-renewable/:id?',auth.authenticateToken ,dataEntry.getNonRenewable); 
// router.delete('/non-renewable/:id',auth.authenticateToken,dataEntry.deleteNonRenewable); 

// // SOLD
// router.post('/sold',auth.authenticateToken,dataEntry.createSoldEnergy) 
// router.put('/sold/:id',auth.authenticateToken,dataEntry.updateSoldEnergy);
// router.get('/sold/:id?',auth.authenticateToken,dataEntry.getSoldEnergy); 
// router.delete('/sold/:id',auth.authenticateToken,dataEntry.deleteSoldEnergy); 

// // REDUCTION
// router.post('/reduction',auth.authenticateToken,dataEntry.createReductionEnergy) 
// router.put('/reduction/:id',auth.authenticateToken,dataEntry.updateReductionEnergy);
// router.get('/reduction/:id?',auth.authenticateToken,dataEntry.getReductionEnergy); 
// router.delete('/reduction/:id',auth.authenticateToken,dataEntry.deleteReductionEnergy); 

// // WATER-PROVIDER
// router.post('/water-provider',auth.authenticateToken,dataEntry.createWaterProvider) 
// router.put('/water-provider/:id',auth.authenticateToken,dataEntry.updateWaterProvider);
// router.get('/water-provider/:id?',auth.authenticateToken,dataEntry.getWaterProvider); 
// router.delete('/water-provider/:id',auth.authenticateToken,dataEntry.deleteWaterProvider); 

// // WATER-TANKER
// router.post('/water-tanker',auth.authenticateToken,dataEntry.createWaterTanker) 
// router.put('/water-tanker/:id',auth.authenticateToken,dataEntry.updateWaterTanker);
// router.get('/water-tanker/:id?',auth.authenticateToken,dataEntry.getWaterTanker); 
// router.delete('/water-tanker/:id',auth.authenticateToken,dataEntry.deleteWaterTanker); 

// // WATER-BOTTLE
// router.post('/water-bottle',auth.authenticateToken,dataEntry.createBottleWater) 
// router.put('/water-bottle/:id',auth.authenticateToken,dataEntry.updateBottleWater);
// router.get('/water-bottle/:id?',auth.authenticateToken,dataEntry.getBottleWater); 
// router.delete('/water-bottle/:id',auth.authenticateToken,dataEntry.deleteBottleWater); 

// // CONCRETE-MIX
// router.post('/concrete',auth.authenticateToken,dataEntry.createBottleWater) 
// router.put('/concrete/:id',auth.authenticateToken,dataEntry.updateBottleWater);
// router.get('/concrete/:id?',auth.authenticateToken,dataEntry.getBottleWater); 
// router.delete('/concrete/:id',auth.authenticateToken,dataEntry.deleteBottleWater);

// // Building-Materials
// router.post('/building-materials',auth.authenticateToken,dataEntry.createBuilding) 
// router.put('/building-materials/:id',auth.authenticateToken,dataEntry.updateBuilding);
// router.get('/building-materials/:id?',auth.authenticateToken,dataEntry.getBuilding); 
// router.delete('/building-materials/:id',auth.authenticateToken,dataEntry.deleteBuilding); 

// // Waste-Managements
// router.post('/waste-managements',auth.authenticateToken,dataEntry.createWasteManagement) 
// router.put('/waste-managements/:id',auth.authenticateToken,dataEntry.updateWasteManagement);
// router.get('/waste-managements/:id?',auth.authenticateToken,dataEntry.getWasteManagement); 
// router.delete('/waste-managements/:id',auth.authenticateToken,dataEntry.deleteWasteManagement); 

// // Waste Direct-Disposal
// router.post('/direct-disposals',auth.authenticateToken,dataEntry.createWasteManagement) 
// router.put('/direct-disposals/:id',auth.authenticateToken,dataEntry.updateWasteManagement);
// router.get('/direct-disposals/:id?',auth.authenticateToken,dataEntry.getWasteManagement); 
// router.delete('/direct-disposals/:id',auth.authenticateToken,dataEntry.deleteWasteManagement); 


// module.exports = router;



// routes/v1/dataEntry.js

const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const dataEntry = require('../../controller/dataEntryController');

/**
 * @swagger
 * tags:
 *   name: Data Entry
 *   description: API endpoints for managing data entries
 */


// ENERGY
/**
 * @swagger
 * /api/v1/data-entry/energy:
 *   post:
 *     summary: Create a new energy provider
 *     tags: [Data Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Energy'
 *     responses:
 *       201:
 *         description: Energy provider created successfully
 *       500:
 *         description: Server error
 */
router.post('/energy/', dataEntry.createEnergyProvider);

/**
 * @swagger
 * /api/v1/data-entry/energy/{id}:
 *   put:
 *     summary: Update an energy provider
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Energy provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Energy'
 *     responses:
 *       200:
 *         description: Energy provider updated successfully
 *       404:
 *         description: Energy provider not found
 *       500:
 *         description: Server error
 */
router.put('/energy/:id', auth.authenticateToken, dataEntry.updateEnergyProvider);

/**
 * @swagger
 * /api/v1/data-entry/energy/{id}:
 *   get:
 *     summary: Get energy provider data by ID or all energy providers
 *     tags: [Data Entry]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Energy provider ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/energy/:id?', dataEntry.getEnergyProvider);

/**
 * @swagger
 * /api/v1/data-entry/energy/{id}:
 *   delete:
 *     summary: Delete an energy provider
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Energy provider ID
 *     responses:
 *       200:
 *         description: Energy provider deleted successfully
 *       404:
 *         description: Energy provider not found
 *       500:
 *         description: Server error
 */
router.delete('/energy/:id', auth.authenticateToken, dataEntry.deleteEnergyProvider);


// RENEWABLE
/**
 * @swagger
 * /api/v1/data-entry/renewable:
 *   post:
 *     summary: Create a new renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Renewable'
 *     responses:
 *       201:
 *         description: Renewable energy source created successfully
 *       500:
 *         description: Server error
 */
router.post('/renewable/', auth.authenticateToken, dataEntry.createRenewable);

/**
 * @swagger
 * /api/v1/data-entry/renewable/{id}:
 *   put:
 *     summary: Update a renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Renewable energy source ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Renewable'
 *     responses:
 *       200:
 *         description: Renewable energy source updated successfully
 *       404:
 *         description: Renewable energy source not found
 *       500:
 *         description: Server error
 */
router.put('/renewable/:id', auth.authenticateToken, dataEntry.updateRenewable);

/**
 * @swagger
 * /api/v1/data-entry/renewable/{id}:
 *   get:
 *     summary: Get renewable energy source data by ID or all renewable sources
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Renewable energy source ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/renewable/:id?', auth.authenticateToken, dataEntry.getRenewable);

/**
 * @swagger
 * /api/v1/data-entry/renewable/{id}:
 *   delete:
 *     summary: Delete a renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Renewable energy source ID
 *     responses:
 *       200:
 *         description: Renewable energy source deleted successfully
 *       404:
 *         description: Renewable energy source not found
 *       500:
 *         description: Server error
 */
router.delete('/renewable/:id', auth.authenticateToken, dataEntry.deleteRenewable);


// NON-RENEWABLE
/**
 * @swagger
 * /api/v1/data-entry/non-renewable:
 *   post:
 *     summary: Create a new non-renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NonRenewable'
 *     responses:
 *       201:
 *         description: Non-renewable energy source created successfully
 *       500:
 *         description: Server error
 */
router.post('/non-renewable', auth.authenticateToken, dataEntry.createNonRenewable);

/**
 * @swagger
 * /api/v1/data-entry/non-renewable/{id}:
 *   put:
 *     summary: Update a non-renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Non-renewable energy source ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NonRenewable'
 *     responses:
 *       200:
 *         description: Non-renewable energy source updated successfully
 *       404:
 *         description: Non-renewable energy source not found
 *       500:
 *         description: Server error
 */
router.put('/non-renewable/:id', auth.authenticateToken, dataEntry.updateNonRenewable);

/**
 * @swagger
 * /api/v1/data-entry/non-renewable/{id}:
 *   get:
 *     summary: Get non-renewable energy source data by ID or all non-renewable sources
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Non-renewable energy source ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/non-renewable/:id?', auth.authenticateToken, dataEntry.getNonRenewable);

/**
 * @swagger
 * /api/v1/data-entry/non-renewable/{id}:
 *   delete:
 *     summary: Delete a non-renewable energy source
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Non-renewable energy source ID
 *     responses:
 *       200:
 *         description: Non-renewable energy source deleted successfully
 *       404:
 *         description: Non-renewable energy source not found
 *       500:
 *         description: Server error
 */
router.delete('/non-renewable/:id', auth.authenticateToken, dataEntry.deleteNonRenewable);


// SOLD
/**
 * @swagger
 * /api/v1/data-entry/sold:
 *   post:
 *     summary: Create a new sold energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SoldEnergy'
 *     responses:
 *       201:
 *         description: Sold energy record created successfully
 *       500:
 *         description: Server error
 */
router.post('/sold', auth.authenticateToken, dataEntry.createSoldEnergy);

/**
 * @swagger
 * /api/v1/data-entry/sold/{id}:
 *   put:
 *     summary: Update a sold energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sold energy record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SoldEnergy'
 *     responses:
 *       200:
 *         description: Sold energy record updated successfully
 *       404:
 *         description: Sold energy record not found
 *       500:
 *         description: Server error
 */
router.put('/sold/:id', auth.authenticateToken, dataEntry.updateSoldEnergy);

/**
 * @swagger
 * /api/v1/data-entry/sold/{id}:
 *   get:
 *     summary: Get sold energy record data by ID or all sold energy records
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Sold energy record ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/sold/:id?', auth.authenticateToken, dataEntry.getSoldEnergy);

/**
 * @swagger
 * /api/v1/data-entry/sold/{id}:
 *   delete:
 *     summary: Delete a sold energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sold energy record ID
 *     responses:
 *       200:
 *         description: Sold energy record deleted successfully
 *       404:
 *         description: Sold energy record not found
 *       500:
 *         description: Server error
 */
router.delete('/sold/:id', auth.authenticateToken, dataEntry.deleteSoldEnergy);


// REDUCTION
/**
 * @swagger
 * /api/v1/data-entry/reduction:
 *   post:
 *     summary: Create a new reduction energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReductionEnergy'
 *     responses:
 *       201:
 *         description: Reduction energy record created successfully
 *       500:
 *         description: Server error
 */
router.post('/reduction', auth.authenticateToken, dataEntry.createReductionEnergy);

/**
 * @swagger
 * /api/v1/data-entry/reduction/{id}:
 *   put:
 *     summary: Update a reduction energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reduction energy record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReductionEnergy'
 *     responses:
 *       200:
 *         description: Reduction energy record updated successfully
 *       404:
 *         description: Reduction energy record not found
 *       500:
 *         description: Server error
 */
router.put('/reduction/:id', auth.authenticateToken, dataEntry.updateReductionEnergy);

/**
 * @swagger
 * /api/v1/data-entry/reduction/{id}:
 *   get:
 *     summary: Get reduction energy record data by ID or all reduction energy records
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Reduction energy record ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/reduction/:id?', auth.authenticateToken, dataEntry.getReductionEnergy);

/**
 * @swagger
 * /api/v1/data-entry/reduction/{id}:
 *   delete:
 *     summary: Delete a reduction energy record
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reduction energy record ID
 *     responses:
 *       200:
 *         description: Reduction energy record deleted successfully
 *       404:
 *         description: Reduction energy record not found
 *       500:
 *         description: Server error
 */
router.delete('/reduction/:id', auth.authenticateToken, dataEntry.deleteReductionEnergy);


// WATER-PROVIDER
/**
 * @swagger
 * /api/v1/data-entry/water-provider:
 *   post:
 *     summary: Create a new water provider
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterProvider'
 *     responses:
 *       201:
 *         description: Water provider created successfully
 *       500:
 *         description: Server error
 */
router.post('/water-provider', auth.authenticateToken, dataEntry.createWaterProvider);

/**
 * @swagger
 * /api/v1/data-entry/water-provider/{id}:
 *   put:
 *     summary: Update a water provider
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterProvider'
 *     responses:
 *       200:
 *         description: Water provider updated successfully
 *       404:
 *         description: Water provider not found
 *       500:
 *         description: Server error
 */
router.put('/water-provider/:id', auth.authenticateToken, dataEntry.updateWaterProvider);

/**
 * @swagger
 * /api/v1/data-entry/water-provider/{id}:
 *   get:
 *     summary: Get water provider data by ID or all water providers
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Water provider ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/water-provider/:id?', auth.authenticateToken, dataEntry.getWaterProvider);

/**
 * @swagger
 * /api/v1/data-entry/water-provider/{id}:
 *   delete:
 *     summary: Delete a water provider
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water provider ID
 *     responses:
 *       200:
 *         description: Water provider deleted successfully
 *       404:
 *         description: Water provider not found
 *       500:
 *         description: Server error
 */
router.delete('/water-provider/:id', auth.authenticateToken, dataEntry.deleteWaterProvider);

// WATER-TANKER
/**
 * @swagger
 * /api/v1/data-entry/water-tanker:
 *   post:
 *     summary: Create a new water tanker entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterTanker'
 *     responses:
 *       201:
 *         description: Water tanker entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/water-tanker', auth.authenticateToken, dataEntry.createWaterTanker);

/**
 * @swagger
 * /api/v1/data-entry/water-tanker/{id}:
 *   put:
 *     summary: Update a water tanker entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water tanker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterTanker'
 *     responses:
 *       200:
 *         description: Water tanker entry updated successfully
 *       404:
 *         description: Water tanker entry not found
 *       500:
 *         description: Server error
 */
router.put('/water-tanker/:id', auth.authenticateToken, dataEntry.updateWaterTanker);

/**
 * @swagger
 * /api/v1/data-entry/water-tanker/{id}:
 *   get:
 *     summary: Get water tanker entry data by ID or all water tanker entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Water tanker ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/water-tanker/:id?', auth.authenticateToken, dataEntry.getWaterTanker);

/**
 * @swagger
 * /api/v1/data-entry/water-tanker/{id}:
 *   delete:
 *     summary: Delete a water tanker entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water tanker ID
 *     responses:
 *       200:
 *         description: Water tanker entry deleted successfully
 *       404:
 *         description: Water tanker entry not found
 *       500:
 *         description: Server error
 */
router.delete('/water-tanker/:id', auth.authenticateToken, dataEntry.deleteWaterTanker);

// WATER-BOTTLE
/**
 * @swagger
 * /api/v1/data-entry/water-bottle:
 *   post:
 *     summary: Create a new water bottle entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterBottle'
 *     responses:
 *       201:
 *         description: Water bottle entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/water-bottle', auth.authenticateToken, dataEntry.createBottleWater);

/**
 * @swagger
 * /api/v1/data-entry/water-bottle/{id}:
 *   put:
 *     summary: Update a water bottle entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water bottle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WaterBottle'
 *     responses:
 *       200:
 *         description: Water bottle entry updated successfully
 *       404:
 *         description: Water bottle entry not found
 *       500:
 *         description: Server error
 */
router.put('/water-bottle/:id', auth.authenticateToken, dataEntry.updateBottleWater);

/**
 * @swagger
 * /api/v1/data-entry/water-bottle/{id}:
 *   get:
 *     summary: Get water bottle entry data by ID or all water bottle entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Water bottle ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/water-bottle/:id?', auth.authenticateToken, dataEntry.getBottleWater);

/**
 * @swagger
 * /api/v1/data-entry/water-bottle/{id}:
 *   delete:
 *     summary: Delete a water bottle entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Water bottle ID
 *     responses:
 *       200:
 *         description: Water bottle entry deleted successfully
 *       404:
 *         description: Water bottle entry not found
 *       500:
 *         description: Server error
 */
router.delete('/water-bottle/:id', auth.authenticateToken, dataEntry.deleteBottleWater);

// CONCRETE-MIX
/**
 * @swagger
 * /api/v1/data-entry/concrete:
 *   post:
 *     summary: Create a new concrete mix entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcreteMix'
 *     responses:
 *       201:
 *         description: Concrete mix entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/concrete', auth.authenticateToken, dataEntry.createConcreteMix);

/**
 * @swagger
 * /api/v1/data-entry/concrete/{id}:
 *   put:
 *     summary: Update a concrete mix entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Concrete mix ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcreteMix'
 *     responses:
 *       200:
 *         description: Concrete mix entry updated successfully
 *       404:
 *         description: Concrete mix entry not found
 *       500:
 *         description: Server error
 */
router.put('/concrete/:id', auth.authenticateToken, dataEntry.updateConcreteMix);

/**
 * @swagger
 * /api/v1/data-entry/concrete/{id}:
 *   get:
 *     summary: Get concrete mix entry data by ID or all concrete mix entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Concrete mix ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/concrete/:id?', auth.authenticateToken, dataEntry.getConcreteMix);

/**
 * @swagger
 * /api/v1/data-entry/concrete/{id}:
 *   delete:
 *     summary: Delete a concrete mix entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Concrete mix ID
 *     responses:
 *       200:
 *         description: Concrete mix entry deleted successfully
 *       404:
 *         description: Concrete mix entry not found
 *       500:
 *         description: Server error
 */
router.delete('/concrete/:id', auth.authenticateToken, dataEntry.deleteConcreteMix);

// BUILDING-MATERIALS
/**
 * @swagger
 * /api/v1/data-entry/building-materials:
 *   post:
 *     summary: Create a new building material entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildingMaterial'
 *     responses:
 *       201:
 *         description: Building material entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/building-materials', auth.authenticateToken, dataEntry.createBuilding);

/**
 * @swagger
 * /api/v1/data-entry/building-materials/{id}:
 *   put:
 *     summary: Update a building material entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Building material ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildingMaterial'
 *     responses:
 *       200:
 *         description: Building material entry updated successfully
 *       404:
 *         description: Building material entry not found
 *       500:
 *         description: Server error
 */
router.put('/building-materials/:id', auth.authenticateToken, dataEntry.updateBuilding);

/**
 * @swagger
 * /api/v1/data-entry/building-materials/{id}:
 *   get:
 *     summary: Get building material entry data by ID or all building material entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Building material ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/building-materials/:id?', auth.authenticateToken, dataEntry.getBuilding);

/**
 * @swagger
 * /api/v1/data-entry/building-materials/{id}:
 *   delete:
 *     summary: Delete a building material entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Building material ID
 *     responses:
 *       200:
 *         description: Building material entry deleted successfully
 *       404:
 *         description: Building material entry not found
 *       500:
 *         description: Server error
 */
router.delete('/building-materials/:id', auth.authenticateToken, dataEntry.deleteBuilding);




// WASTE-MANAGEMENTS
/**
 * @swagger
 * /api/v1/data-entry/waste-managements:
 *   post:
 *     summary: Create a new waste management entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WasteManagement'
 *     responses:
 *       201:
 *         description: Waste management entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/waste-managements', auth.authenticateToken, dataEntry.createWasteManagement);

/**
 * @swagger
 * /api/v1/data-entry/waste-managements/{id}:
 *   put:
 *     summary: Update a waste management entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Waste management ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WasteManagement'
 *     responses:
 *       200:
 *         description: Waste management entry updated successfully
 *       404:
 *         description: Waste management entry not found
 *       500:
 *         description: Server error
 */
router.put('/waste-managements/:id', auth.authenticateToken, dataEntry.updateWasteManagement);

/**
 * @swagger
 * /api/v1/data-entry/waste-managements/{id}:
 *   get:
 *     summary: Get waste management entry data by ID or all waste management entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Waste management ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/waste-managements/:id?', auth.authenticateToken, dataEntry.getWasteManagement);

/**
 * @swagger
 * /api/v1/data-entry/waste-managements/{id}:
 *   delete:
 *     summary: Delete a waste management entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Waste management ID
 *     responses:
 *       200:
 *         description: Waste management entry deleted successfully
 *       404:
 *         description: Waste management entry not found
 *       500:
 *         description: Server error
 */
router.delete('/waste-managements/:id', auth.authenticateToken, dataEntry.deleteWasteManagement);

// WASTE-DIRECT-DISPOSAL
/**
 * @swagger
 * /api/v1/data-entry/direct-disposals:
 *   post:
 *     summary: Create a new waste direct disposal entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WasteDirectDisposal'
 *     responses:
 *       201:
 *         description: Waste direct disposal entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/direct-disposals', auth.authenticateToken, dataEntry.createDirectDisposal);

/**
 * @swagger
 * /api/v1/data-entry/direct-disposals/{id}:
 *   put:
 *     summary: Update a waste direct disposal entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Waste direct disposal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WasteDirectDisposal'
 *     responses:
 *       200:
 *         description: Waste direct disposal entry updated successfully
 *       404:
 *         description: Waste direct disposal entry not found
 *       500:
 *         description: Server error
 */
router.put('/direct-disposals/:id', auth.authenticateToken, dataEntry.updateDirectDisposal);

/**
 * @swagger
 * /api/v1/data-entry/direct-disposals/{id}:
 *   get:
 *     summary: Get waste direct disposal entry data by ID or all waste direct disposal entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Waste direct disposal ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/direct-disposals/:id?', auth.authenticateToken, dataEntry.getDirectDisposal);

/**
 * @swagger
 * /api/v1/data-entry/direct-disposals/{id}:
 *   delete:
 *     summary: Delete a waste direct disposal entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Waste direct disposal ID
 *     responses:
 *       200:
 *         description: Waste direct disposal entry deleted successfully
 *       404:
 *         description: Waste direct disposal entry not found
 *       500:
 *         description: Server error
 */
router.delete('/direct-disposals/:id', auth.authenticateToken, dataEntry.deleteDirectDisposal);

// // divert-disposals
router.post('/divert-disposals',auth.authenticateToken,dataEntry.createDivertedDisposal) 
router.put('/divert-disposals/:id',auth.authenticateToken,dataEntry.updateDivertedDisposal);
router.get('/divert-disposals/:id?',auth.authenticateToken,dataEntry.getDivertedDisposal); 
router.delete('/divert-disposals/:id',auth.authenticateToken,dataEntry.deleteDivertedDisposal); 

// Worker-Transportation
router.post('/worker-transportation',auth.authenticateToken,dataEntry.createWorkerTransportation) 
router.put('/worker-transportation/:id',auth.authenticateToken,dataEntry.updateWorkerTransportation);
router.get('/worker-transportation/:id?',auth.authenticateToken,dataEntry.getWorkerTransportation); 
router.delete('/worker-transportation/:id',auth.authenticateToken,dataEntry.deleteWorkerTransportation); 

// Site-Vehicle
router.post('/site-vehicle',auth.authenticateToken,dataEntry.createSiteVehicle) 
router.put('/site-vehicle/:id',auth.authenticateToken,dataEntry.updateSiteVehicle);
router.get('/site-vehicle/:id?',auth.authenticateToken,dataEntry.getSiteVehicle); 
router.delete('/site-vehicle/:id',auth.authenticateToken,dataEntry.deleteSiteVehicle); 

// Business-Travel
router.post('/business-travel',auth.authenticateToken,dataEntry.createBusinessTravel) 
router.put('/business-travel/:id',auth.authenticateToken,dataEntry.updateBusinessTravel);
router.get('/business-travel/:id?',auth.authenticateToken,dataEntry.getBusinessTravel); 
router.delete('/business-travel/:id',auth.authenticateToken,dataEntry.deleteBusinessTravel); 

// Employee-Commuting
router.post('/employee-commuting',auth.authenticateToken,dataEntry.createCommuting) 
router.put('/employee-commuting/:id',auth.authenticateToken,dataEntry.updateCommuting);
router.get('/employee-commuting/:id?',auth.authenticateToken,dataEntry.getCommuting); 
router.delete('/employee-commuting/:id',auth.authenticateToken,dataEntry.deleteCommuting); 

module.exports = router;


