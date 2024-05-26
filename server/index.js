// Requiring necessary modules
const express = require('express');
const dotenv = require('dotenv').config(); // Configuration management
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // MongoDB ORM
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const JWT = require('jsonwebtoken');
const {app, server} = require('../server/socket/socket');

// Creating an instance of express application
// const app = express();

const candidateRoutes = require('./routes/candidate.routes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');

// Connecting to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware setup
app.use(express.json({ limit: '3mb' })); // Parsing JSON request bodies with increased payload size limit
app.use(cookieParser()); // Parsing cookies
app.use(express.urlencoded({ limit: '3mb', extended: false })); // Parsing URL-encoded request bodies with increased payload size limit

// Routes setup
app.use('/', authRoutes); // Mounting auth routes
app.use('/job',  require('./routes/jobPostingRoutes'));
app.use('/status', require('./routes/statusRoutes'));
app.use('/message', messageRoutes);
app.use('/users', userRoutes);
app.use('/candidatedash', candidateRoutes); 
//app.use('/Protected', require('./routes/ProtectedRoute'));

// Defining the port for the server to listen on
const port = 8000;

// starts listening for both regular HTTP requests (handled by Express) and WebSocket connections (handled by Socket.IO) on the specified port.
server.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});
//  server.listen(PORT) instead of app.listen(PORT),
// you're instructing the combined HTTP server (which includes both Express and Socket.IO) 
// to listen on the specified port for both regular HTTP requests and WebSocket connections. 
// This setup allows you to use both Express routes and Socket.IO functionality in the same application.

