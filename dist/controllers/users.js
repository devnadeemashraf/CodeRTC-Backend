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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const prisma_1 = require("../prisma");
const bcrypt_1 = require("../utils/bcrypt");
const tokens_1 = require("../utils/tokens");
class UsersController {
    registerNewUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, password } = request.body;
            if (!username || !name || !password) {
                return response.status(400).json({
                    message: "One or more fields are missing",
                });
            }
            const userFromDB = yield prisma_1.prisma.user.findFirst({
                where: {
                    username,
                },
            });
            if (userFromDB) {
                return response.status(400).json({
                    message: "Username Already Exists",
                });
            }
            // Hash Password
            const userId = (0, uuid_1.v4)();
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            const newUser = yield prisma_1.prisma.user.create({
                data: {
                    id: userId,
                    username,
                    name,
                    password: hashedPassword,
                },
            });
            // Create New Token
            const accessToken = yield (0, tokens_1.generateToken)({
                id: userId,
                username,
            }, "access_token");
            // Create New Cookie
            response.cookie("accessToken", accessToken);
            response.status(200);
            // Return User
            return response.json({
                message: "Registration Successfull ",
                user: newUser,
            });
        });
    }
    loginUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            if (!username || !password) {
                return response.status(400).json({
                    message: "One or more fields are missing",
                });
            }
            const userFromDB = yield prisma_1.prisma.user.findFirst({
                where: {
                    username,
                },
            });
            if (!userFromDB) {
                return response.status(400).json({
                    message: "Invalid Username or Password",
                });
            }
            const hashedPassword = userFromDB === null || userFromDB === void 0 ? void 0 : userFromDB.password;
            const passwordMatches = yield (0, bcrypt_1.compareHashedPassword)(password, hashedPassword);
            if (!passwordMatches) {
                return response.status(400).json({
                    message: "Invalid Username or Password",
                });
            }
            // Create New Token
            const accessToken = yield (0, tokens_1.generateToken)({
                id: userFromDB.id,
                username: userFromDB.username,
            }, "access_token");
            // Create New Cookie
            response.cookie("accessToken", accessToken);
            response.status(200);
            // Return User
            return response.json({
                message: "Logged In",
                user: userFromDB,
            });
        });
    }
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            yield prisma_1.prisma.user.delete({
                where: {
                    id: user.id,
                },
            });
            response.clearCookie("accessToken");
            return response.status(200).json({
                message: `UserID : ${user.id} and its corresponding relations have been entirely deleted.`,
            });
        });
    }
    logoutUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            // Remove Session from DB
            response.clearCookie("accessToken");
            return response.status(200).json({
                message: `UserID : ${user.id} Logged Out Successfully.`,
            });
        });
    }
    returnAuthStatus(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            return response.status(200).json({
                message: "Authorized",
                user,
            });
        });
    }
}
exports.default = new UsersController();
