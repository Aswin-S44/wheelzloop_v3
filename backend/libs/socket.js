const { Server } = require("socket.io");
const http = require("http");

const express = require("express");

const app = express();

const userSocketMap = {};

const server = http.createServer(app);

const socketOrigin = [];

const productionSiteUrl = "https://carauras.com";
const localSiteUrl = "http://localhost:3000";

process.env.NODE_ENV == "production"
  ? socketOrigin.push(productionSiteUrl)
  : socketOrigin.push(localSiteUrl);

const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:3000"],
    origin: socketOrigin,
  },
});

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
