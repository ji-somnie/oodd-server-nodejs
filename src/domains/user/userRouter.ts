import { Router, Request, Response } from "express";
import { UserService } from "./userService";

const userRouter = Router();
const userService = new UserService();

userRouter.get("/api/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);  // Number 대신 parseInt 사용
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await userService.getUserByUserId(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default userRouter;
