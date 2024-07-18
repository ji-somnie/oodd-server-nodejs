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
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.userRepository.find();
        });
    }
    createUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_repository_1.userRepository.create({ name, email });
            return user_repository_1.userRepository.save(user);
        });
    }
}
exports.UserService = UserService;
