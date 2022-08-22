import { Router } from "express";
import userRouter from "./user/user.router.js";
import authRouter from "./auth/auth.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
