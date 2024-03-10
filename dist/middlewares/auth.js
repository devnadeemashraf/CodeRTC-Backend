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
const tokens_1 = require("../utils/tokens");
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = request.cookies;
    // Authenticate Cookie
    const isAuthenticated = yield (0, tokens_1.verifyToken)(accessToken, "access_token");
    // Return Unauthorized if not valid cookie
    if (!isAuthenticated) {
        return response.status(400).json({
            message: "Unauthorized",
        });
    }
    // Decode User from Cookie
    const signedInUser = yield (0, tokens_1.decodeToken)(accessToken);
    // If No User Info, Return Not Signed In
    if (!signedInUser) {
        return response.status(404).json({
            message: "Not Signed In",
        });
    }
    // Attach Decoded User to Request
    request.user = signedInUser;
    next();
});
exports.default = authMiddleware;
