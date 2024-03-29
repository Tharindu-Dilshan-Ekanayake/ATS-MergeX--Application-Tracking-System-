const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getprofile } = require('../controllers/authController');
//const ProtectedRoute = require('./ProtectedRoute'); // Import ProtectedRoute middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getprofile)

// Protected route with logging
//router.get('/protected-route', ProtectedRoute);


module.exports = router;
