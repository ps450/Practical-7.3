const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("🔗 A user connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // Broadcast the message to all clients
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
