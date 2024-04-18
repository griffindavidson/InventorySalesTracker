const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const categoriesController = require('../controllers/categoriesController');
const { authenticateToken } = require('../utilities/auth');

// GET all categories - secured
router.get('/', authenticateToken, categoriesController.getAllCategories);

// POST a new category - secured and validated
router.post('/', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('description').optional().trim(),
], categoriesController.createCategory);

// GET a single category by ID - secured
router.get('/:id', authenticateToken, categoriesController.getCategoryById);

// PUT update a category by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('description').optional().trim(),
], categoriesController.updateCategory);

// DELETE a category by ID - secured
router.delete('/:id', authenticateToken, categoriesController.deleteCategory);

module.exports = router;