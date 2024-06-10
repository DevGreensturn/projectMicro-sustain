// routes/v1/project.js
const router = require('express').Router();
const auth = require('../../middleware/authHandler');
const projects = require('../../controller/projectController');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         referenceNo:
 *           type: number
 *         projectName:
 *           type: string
 *         projectPackageId:
 *           type: string
 *         mainContractor:
 *           type: string
 *         topology:
 *           type: string
 *         packageCurrentPackage:
 *           type: string
 *         manHours:
 *           type: string
 *         plotArea:
 *           type: string
 *         gfa:
 *           type: string
 *         roadLength:
 *           type: string
 *         infrastructure:
 *           type: string
 *         SubscriptionCategory:
 *           type: string
 *           enum: [Building, Road, Infrastructure]
 *         subscriptionTier:
 *           type: string
 *         SustainabilityRating:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Server error
 */
router.post("/", auth.authenticateToken, projects.createProject);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Get project data by ID or all projects with pagination
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Project ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Number of projects per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get("/:id?", auth.authenticateToken, projects.getProjectData);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth.authenticateToken, projects.updateProject);

module.exports = router;