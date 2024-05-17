const { Server } = require("socket.io");
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app); // http.createServer(app) sets up an HTTP server (your house) capable of handling regular web requests.
 
// new Server(express server) addsto a Socket.IO server (a new room in your house) to handle real-time communication alongside the HTTP server.
const io = new Server(server , {  
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// The io variable holds this Socket.IO server instance, allowing you to interact with the Socket.IO server, listen for events, and manage real-time communication between clients and the server.

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {} // {userId : socketId}

io.on('connection', (socket) => {
  console.log("User connected : ", socket.id);  // this event Listent to this code ( socket = io("http://localhost:8000", {} )

  const userId = socket.handshake.query.userId;

  if(userId != "undefined") {
    userSocketMap[userId] = socket.id;  // create property called userId and set its value to socket.id {FqEV5ZcOp_GchK-2AAAD : useId} :
  }

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  // socket.on is used to listen to the events. can be used both on client and server side 
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap));  
  })
});



module.exports =  {app, io, server, getReceiverSocketId};
