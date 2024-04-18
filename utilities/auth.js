const authenticateToken = (req, res, next) => {
    // Mock authentication logic
    console.log('Authentication middleware called');
    next();
};

module.exports = { authenticateToken };