const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productsController = require('../controllers/productsController');
const { authenticateToken } = require('../utilities/auth');

// GET all products - secured
router.get('/', authenticateToken, productsController.getAllProducts);

// POST a new product - secured and validated
router.post('/', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('price').isDecimal().withMessage('Price must be a valid decimal number'),
    body('category_id').isInt().withMessage('Category ID must be a valid integer'),
    body('supplier_id').isInt().withMessage('Supplier ID must be a valid integer'),
    body('stock_level').isInt({ min: 0 }).withMessage('Stock level must be a non-negative integer'),
], productsController.createProduct);

// GET a single product by ID - secured
router.get('/:id', authenticateToken, productsController.getProductById);

// PUT update a product by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('price').isDecimal().withMessage('Price must be a valid decimal number'),
    body('category_id').isInt().withMessage('Category ID must be a valid integer'),
    body('supplier_id').isInt().withMessage('Supplier ID must be a valid integer'),
    body('stock_level').isInt({ min: 0 }).withMessage('Stock level must be a non-negative integer'),
], productsController.updateProduct);

// DELETE a product by ID - secured
router.delete('/:id', authenticateToken, productsController.deleteProduct);

module.exports = router;
