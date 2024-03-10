"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashedPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (plainTextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default
            .hash(plainTextPassword, 10)
            .then((value) => {
            resolve(value);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.hashPassword = hashPassword;
const compareHashedPassword = (plainTextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default
            .compare(plainTextPassword, hashedPassword)
            .then(() => {
            resolve(true);
        })
            .catch(() => {
            reject(false);
        });
    });
};
exports.compareHashedPassword = compareHashedPassword;
