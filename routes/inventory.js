const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../utilities/auth');

// GET all inventory items - secured
router.get('/', authenticateToken, inventoryController.getAllInventoryItems);

// POST a new inventory item - secured and validated
router.post('/', authenticateToken, [
    body('product_id').isInt().withMessage('Product ID must be a valid integer'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('location').trim().not().isEmpty().withMessage('Location is required'),
], inventoryController.createInventoryItem);

// GET a single inventory item by ID - secured
router.get('/:id', authenticateToken, inventoryController.getInventoryItemById);

// PUT update an inventory item by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('product_id').isInt().withMessage('Product ID must be a valid integer'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('location').trim().not().isEmpty().withMessage('Location is required'),
], inventoryController.updateInventoryItem);

// DELETE an inventory item by ID - secured
router.delete('/:id', authenticateToken, inventoryController.deleteInventoryItem);

module.exports = router;