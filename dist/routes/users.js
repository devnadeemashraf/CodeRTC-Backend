"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const usesRouter = (0, express_1.Router)();
usesRouter.post("/register", users_1.default.registerNewUser);
usesRouter.post("/login", users_1.default.loginUser);
usesRouter.post("/logout", auth_1.default, users_1.default.logoutUser);
usesRouter.delete("/delete", auth_1.default, users_1.default.deleteUser);
usesRouter.get("/auth-status", auth_1.default, users_1.default.returnAuthStatus);
exports.default = usesRouter;
