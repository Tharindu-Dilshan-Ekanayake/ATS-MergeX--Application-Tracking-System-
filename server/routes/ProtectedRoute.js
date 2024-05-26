// Import the necessary modules
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function to protect routes and log user access
const ProtectedRoute = async (req, res, next) => {
    try {
        // Retrieve the token from the request headers
        const token = req.headers.authorization;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Retrieve user information from the decoded token
        const userId = decoded.id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Log user access
        console.log(`User ${user.email} accessed the protected route at ${new Date()}`);

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors (e.g., token verification failure)
        console.error('Error protecting route:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = ProtectedRoute;
