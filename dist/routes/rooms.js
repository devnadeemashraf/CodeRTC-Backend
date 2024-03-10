"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_1 = __importDefault(require("../controllers/rooms"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const roomsRouter = (0, express_1.Router)();
roomsRouter.post("/open", auth_1.default, rooms_1.default.createNewRoom);
roomsRouter.post("/close/:roomId", auth_1.default, rooms_1.default.createNewRoom);
roomsRouter.post("/join/:roomId", auth_1.default, rooms_1.default.createNewRoom);
exports.default = roomsRouter;
