"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./domains/user/userController"));
const authController_1 = __importDefault(require("./domains/auth/authController"));
//import postRouter from "./domains/ootd/postController";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", userController_1.default);
app.use("/auth", authController_1.default); //소셜 로그인 처리
//app.use("/posts", postRouter);
exports.default = app;
