"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateToken = exports.decodeToken = exports.verifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return false;
    }
    return new Promise((resolve, reject) => {
        const tokenSecret = type == "access_token"
            ? process.env.JWT_SECRET_ACCESS
            : process.env.JWT_SECRET_REFRESH;
        const isValid = jwt.verify(token, tokenSecret);
        if (isValid) {
            resolve(true);
        }
        else {
            reject(false);
        }
    });
});
exports.verifyToken = verifyToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return null;
    }
    return new Promise((resolve, reject) => {
        const decodedUser = jwt.decode(token, {
            json: true,
        });
        if (decodedUser) {
            resolve(decodedUser);
        }
        else {
            reject(null);
        }
    });
});
exports.decodeToken = decodeToken;
const generateToken = (payload, type) => {
    if (!payload) {
        return null;
    }
    const tokenSecret = type == "access_token"
        ? process.env.JWT_SECRET_ACCESS
        : process.env.JWT_SECRET_REFRESH;
    return new Promise((resolve, reject) => {
        const token = jwt.sign(payload, tokenSecret);
        if (token) {
            resolve(token);
        }
        else {
            reject(null);
        }
    });
};
exports.generateToken = generateToken;