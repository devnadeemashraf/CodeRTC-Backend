import dotevn from "dotenv";
dotevn.config();

const PORT = process.env.PORT || 3001;
const REDIS_URI = process.env.REDIS_URI as string;

import cors from "cors";
import cookieParser from "cookie-parser";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import roomsRouter from "./routes/rooms";

import Redis from "ioredis";
import usesRouter from "./routes/users";
const redis = new Redis(REDIS_URI);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://codertc.nadeemashraf.dev",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const httpServer = createServer(app);

app.get("/updates", async (req, res) => {
  const cachedUpdates = await redis.get("updates");
  return res.status(200).json(cachedUpdates);
});

app.use("/api/v1/room", roomsRouter);
app.use("/api/v1/auth/user", usesRouter);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://codertc.nadeemashraf.dev",
    ],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("typing", (value) => {
    console.log(`user with id-${socket.id} is typing - ${value}`);
    redis.set("updates", value);

    socket.broadcast.emit("updates", value);
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listeting on PORT : ${PORT}`);
});
