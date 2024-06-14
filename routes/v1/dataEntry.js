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
router.post('/energy/', auth.authenticateToken, dataEntry.createEnergyProvider);

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
router.get('/energy/:id?',auth.authenticateToken,  dataEntry.getEnergyProvider);

/**
 * @swagger
 * /api/v1/data-entry/energy/{id}:
 *   patch:
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
router.patch('/energy/:id', auth.authenticateToken,  dataEntry.deleteEnergyProvider);


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
 * /api/v1/data-entry/energy/{id}:
 *   patch:
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
router.patch('/energy/:id', auth.authenticateToken, dataEntry.deleteEnergyProvider);


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
router.patch('/non-renewable/:id', auth.authenticateToken, dataEntry.deleteNonRenewable);


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
router.patch('/sold/:id', auth.authenticateToken, dataEntry.deleteSoldEnergy);


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
router.patch('/reduction/:id', auth.authenticateToken, dataEntry.deleteReductionEnergy);


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
router.patch('/water-provider/:id', auth.authenticateToken, dataEntry.deleteWaterProvider);

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
router.patch('/water-tanker/:id', auth.authenticateToken, dataEntry.deleteWaterTanker);

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
router.patch('/water-bottle/:id', auth.authenticateToken, dataEntry.deleteBottleWater);

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
router.patch('/concrete/:id', auth.authenticateToken, dataEntry.deleteConcreteMix);

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
router.patch('/building-materials/:id', auth.authenticateToken, dataEntry.deleteBuilding);


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
router.patch('/waste-managements/:id', auth.authenticateToken, dataEntry.deleteWasteManagement);

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
router.patch('/direct-disposals/:id', auth.authenticateToken, dataEntry.deleteDirectDisposal);



// DIVERT DISPOSAL
/**
 * @swagger
 * /api/v1/data-entry/divert-disposals:
 *   post:
 *     summary: Create a new diverted disposal
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DivertedDisposal'
 *     responses:
 *       201:
 *         description: Diverted disposal created successfully
 *       500:
 *         description: Server error
 */
router.post('/divert-disposals', auth.authenticateToken, dataEntry.createDivertedDisposal);

/**
 * @swagger
 * /api/v1/data-entry/divert-disposals/{id}:
 *   put:
 *     summary: Update a diverted disposal
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Diverted disposal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DivertedDisposal'
 *     responses:
 *       200:
 *         description: Diverted disposal updated successfully
 *       404:
 *         description: Diverted disposal not found
 *       500:
 *         description: Server error
 */
router.put('/divert-disposals/:id', auth.authenticateToken, dataEntry.updateDivertedDisposal);

/**
 * @swagger
 * /api/v1/data-entry/divert-disposals/{id}:
 *   get:
 *     summary: Get diverted disposal data by ID or all diverted disposals
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Diverted disposal ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/divert-disposals/:id?', auth.authenticateToken, dataEntry.getDivertedDisposal);

/**
 * @swagger
 * /api/v1/data-entry/divert-disposals/{id}:
 *   delete:
 *     summary: Delete a diverted disposal
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Diverted disposal ID
 *     responses:
 *       200:
 *         description: Diverted disposal deleted successfully
 *       404:
 *         description: Diverted disposal not found
 *       500:
 *         description: Server error
 */
router.patch('/divert-disposals/:id', auth.authenticateToken, dataEntry.deleteDivertedDisposal);

// SITE VEHICLE
/**
 * @swagger
 * /api/v1/data-entry/site-vehicle:
 *   post:
 *     summary: Create a new site vehicle
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SiteVehicle'
 *     responses:
 *       201:
 *         description: Site vehicle created successfully
 *       500:
 *         description: Server error
 */
router.post('/site-vehicle', auth.authenticateToken, dataEntry.createSiteVehicle);

/**
 * @swagger
 * /api/v1/data-entry/site-vehicle/{id}:
 *   put:
 *     summary: Update a site vehicle
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Site vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SiteVehicle'
 *     responses:
 *       200:
 *         description: Site vehicle updated successfully
 *       404:
 *         description: Site vehicle not found
 *       500:
 *         description: Server error
 */
router.put('/site-vehicle/:id', auth.authenticateToken, dataEntry.updateSiteVehicle);

/**
 * @swagger
 * /api/v1/data-entry/site-vehicle/{id}:
 *   get:
 *     summary: Get site vehicle data by ID or all site vehicles
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Site vehicle ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/site-vehicle/:id?', auth.authenticateToken, dataEntry.getSiteVehicle);

/**
 * @swagger
 * /api/v1/data-entry/site-vehicle/{id}:
 *   delete:
 *     summary: Delete a site vehicle
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Site vehicle ID
 *     responses:
 *       200:
 *         description: Site vehicle deleted successfully
 *       404:
 *         description: Site vehicle not found
 *       500:
 *         description: Server error
 */
router.patch('/site-vehicle/:id', auth.authenticateToken, dataEntry.deleteSiteVehicle);

// WORKER TRANSPORTATION
/**
* @swagger
* /api/v1/data-entry/worker-transportation:
*   post:
*     summary: Create a new worker transportation entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/WorkerTransportation'
*     responses:
*       201:
*         description: Worker transportation entry created successfully
*       500:
*         description: Server error
*/
router.post('/worker-transportation', auth.authenticateToken, dataEntry.createWorkerTransportation);

/**
* @swagger
* /api/v1/data-entry/worker-transportation/{id}:
*   put:
*     summary: Update a worker transportation entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Worker transportation entry ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/WorkerTransportation'
*     responses:
*       200:
*         description: Worker transportation entry updated successfully
*       404:
*         description: Worker transportation entry not found
*       500:
*         description: Server error
*/
router.put('/worker-transportation/:id', auth.authenticateToken, dataEntry.updateWorkerTransportation);

/**
* @swagger
* /api/v1/data-entry/worker-transportation/{id}:
*   get:
*     summary: Get worker transportation entry by ID or all entries
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         description: Worker transportation entry ID
*     responses:
*       200:
*         description: Successful response
*       500:
*         description: Server error
*/
router.get('/worker-transportation/:id?', auth.authenticateToken, dataEntry.getWorkerTransportation);

/**
* @swagger
* /api/v1/data-entry/worker-transportation/{id}:
*   delete:
*     summary: Delete a worker transportation entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Worker transportation entry ID
*     responses:
*       200:
*         description: Worker transportation entry deleted successfully
*       404:
*         description: Worker transportation entry not found
*       500:
*         description: Server error
*/
router.patch('/worker-transportation/:id', auth.authenticateToken, dataEntry.deleteWorkerTransportation);

// BUSINESS TRAVEL
/**
* @swagger
* /api/v1/data-entry/business-travel:
*   post:
*     summary: Create a new business travel entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/BusinessTravel'
*     responses:
*       201:
*         description: Business travel entry created successfully
*       500:
*         description: Server error
*/
router.post('/business-travel', auth.authenticateToken, dataEntry.createBusinessTravel);

/**
* @swagger
* /api/v1/data-entry/business-travel/{id}:
*   put:
*     summary: Update a business travel entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Business travel entry ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/BusinessTravel'
*     responses:
*       200:
*         description: Business travel entry updated successfully
*       404:
*         description: Business travel entry not found
*       500:
*         description: Server error
*/
router.put('/business-travel/:id', auth.authenticateToken, dataEntry.updateBusinessTravel);

/**
* @swagger
* /api/v1/data-entry/business-travel/{id}:
*   get:
*     summary: Get business travel entry by ID or all entries
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         description: Business travel entry ID
*     responses:
*       200:
*         description: Successful response
*       500:
*         description: Server error
*/
router.get('/business-travel/:id?', auth.authenticateToken, dataEntry.getBusinessTravel);

/**
* @swagger
* /api/v1/data-entry/business-travel/{id}:
*   delete:
*     summary: Delete a business travel entry
*     tags: [Data Entry]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Business travel entry ID
*     responses:
*       200:
*         description: Business travel entry deleted successfully
*       404:
*         description: Business travel entry not found
*       500:
*         description: Server error
*/
router.patch('/business-travel/:id', auth.authenticateToken, dataEntry.deleteBusinessTravel);

// EMPLOYEE-COMMUTING
/**
 * @swagger
 * /api/v1/data-entry/employee-commuting:
 *   post:
 *     summary: Create a new employee commuting entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCommuting'
 *     responses:
 *       201:
 *         description: Employee commuting entry created successfully
 *       500:
 *         description: Server error
 */
router.post('/employee-commuting', auth.authenticateToken, dataEntry.createCommuting);

/**
 * @swagger
 * /api/v1/data-entry/employee-commuting/{id}:
 *   put:
 *     summary: Update an employee commuting entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee commuting entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCommuting'
 *     responses:
 *       200:
 *         description: Employee commuting entry updated successfully
 *       404:
 *         description: Employee commuting entry not found
 *       500:
 *         description: Server error
 */
router.put('/employee-commuting/:id', auth.authenticateToken, dataEntry.updateCommuting);

/**
 * @swagger
 * /api/v1/data-entry/employee-commuting/{id}:
 *   get:
 *     summary: Get employee commuting entry by ID or all entries
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Employee commuting entry ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/employee-commuting/:id?', auth.authenticateToken, dataEntry.getCommuting);

/**
 * @swagger
 * /api/v1/data-entry/employee-commuting/{id}:
 *   delete:
 *     summary: Delete an employee commuting entry
 *     tags: [Data Entry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee commuting entry ID
 *     responses:
 *       200:
 *         description: Employee commuting entry deleted successfully
 *       404:
 *         description: Employee commuting entry not found
 *       500:
 *         description: Server error
 */
router.patch('/employee-commuting/:id', auth.authenticateToken, dataEntry.deleteCommuting);

module.exports = router;