import { Router, Request, Response } from "express";
import { UserService } from "./userService";
import { UserRequestDto } from "./dtos/userRequest.dto";

const userRouter = Router();
const userService = new UserService();



export default Router;
