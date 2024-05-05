// Requiring necessary modules
const express = require('express');
const dotenv = require('dotenv').config(); // Configuration management
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // MongoDB ORM
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const JWT = require('jsonwebtoken')

// Creating an instance of express application
const app = express();

// Connecting to the database
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware setup
app.use(express.json({ limit: '3mb' })); // Parsing JSON request bodies with increased payload size limit
app.use(cookieParser()); // Parsing cookies
app.use(express.urlencoded({ limit: '3mb', extended: false })); // Parsing URL-encoded request bodies with increased payload size limit

// Routes setup
app.use('/', require('./routes/authRoutes')); // Mounting auth routes
app.use('/job', require('./routes/jobPostingRoutes')); // Mounting job posting routes)

//app.use('/Protected', require('./routes/ProtectedRoute'));
// Defining the port for the server to listen on
const port = 8000;

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

