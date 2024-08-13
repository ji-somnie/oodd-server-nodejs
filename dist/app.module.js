"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./domains/user/userController"));
const ootdLikeController_1 = __importDefault(require("./domains/ootdLike/ootdLikeController"));
const ootdCommentController_1 = __importDefault(require("./domains/ootdComment/ootdCommentController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', userController_1.default);
app.use('/ootdLike', ootdLikeController_1.default);
app.use('/ootdComment', ootdCommentController_1.default);
exports.default = app;

