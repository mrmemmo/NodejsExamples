// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public/ directory
app.use(express.static("public"));

// We'll store all chat messages here in memory (simple example):
// Each entry will be { name: "Alice", text: "Hello, everyone!" }
let messages = [];

// Listen for new socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // 1) Send existing chat history to the newly connected client
  socket.emit("chatHistory", messages);

  // 2) When client emits a new chat message:
  //    payload should be { name, text }
  socket.on("sendChat", (payload) => {
    console.log("New chat message:", payload);
    // Add the new message to our in-memory "messages" array
    messages.push(payload);
    
    // Broadcast this new message to all connected clients
    io.emit("chatMessage", payload);
  });

  // Optional: when user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});
