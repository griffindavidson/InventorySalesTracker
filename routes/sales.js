const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const salesController = require('../controllers/salesController');
const { authenticateToken } = require('../utilities/auth');

// GET all sales - secured
router.get('/', authenticateToken, salesController.getAllSales);

// POST a new sale - secured and validated
router.post('/', authenticateToken, [
    body('date').isDate().withMessage('Date must be a valid date'),
    body('customer_id').isInt().withMessage('Customer ID must be a valid integer'),
    body('total_amount').isDecimal().withMessage('Total amount must be a valid decimal number'),
], salesController.createSale);

// GET a single sale by ID - secured
router.get('/:id', authenticateToken, salesController.getSaleById);

// PUT update a sale by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('date').isDate().withMessage('Date must be a valid date'),
    body('customer_id').isInt().withMessage('Customer ID must be a valid integer'),
    body('total_amount').isDecimal().withMessage('Total amount must be a valid decimal number'),
], salesController.updateSale);

// DELETE a sale by ID - secured
router.delete('/:id', authenticateToken, salesController.deleteSale);

module.exports = router;