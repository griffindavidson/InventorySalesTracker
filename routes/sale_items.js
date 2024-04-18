const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const saleItemsController = require('../controllers/sale_itemsController');
const { authenticateToken } = require('../utilities/auth');

// GET all sale items - secured
router.get('/', authenticateToken, saleItemsController.getAllSaleItems);

// POST a new sale item - secured and validated
router.post('/', authenticateToken, [
    body('sale_id').isInt().withMessage('Sale ID must be a valid integer'),
    body('product_id').isInt().withMessage('Product ID must be a valid integer'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('price').isDecimal().withMessage('Price must be a valid decimal number'),
], saleItemsController.createSaleItem);

// GET a single sale item by ID - secured
router.get('/:id', authenticateToken, saleItemsController.getSaleItemById);

// PUT update a sale item by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('sale_id').isInt().withMessage('Sale ID must be a valid integer'),
    body('product_id').isInt().withMessage('Product ID must be a valid integer'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('price').isDecimal().withMessage('Price must be a valid decimal number'),
], saleItemsController.updateSaleItem);

// DELETE a sale item by ID - secured
router.delete('/:id', authenticateToken, saleItemsController.deleteSaleItem);

module.exports = router;