"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const REDIS_URI = process.env.REDIS_URI;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const rooms_1 = __importDefault(require("./routes/rooms"));
const ioredis_1 = __importDefault(require("ioredis"));
const users_1 = __importDefault(require("./routes/users"));
const redis = new ioredis_1.default(REDIS_URI);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const httpServer = (0, http_1.createServer)(app);
app.get("/updates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedUpdates = yield redis.get("updates");
    return res.status(200).json(cachedUpdates);
}));
app.use("/api/v1/room", rooms_1.default);
app.use("/api/v1/auth/user", users_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
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
