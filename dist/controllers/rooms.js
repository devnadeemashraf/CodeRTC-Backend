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
const random_word_slugs_1 = require("random-word-slugs");
class RoomsController {
    createNewRoom(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate New Slug
            const roomSlug = String(`${(0, random_word_slugs_1.generateSlug)()}-${Date.now()}`);
        });
    }
}
exports.default = new RoomsController();
