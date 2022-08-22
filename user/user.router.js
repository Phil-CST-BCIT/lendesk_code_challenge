import { Router } from "express";
import { registerUser, loginUser } from "./user.controller.js";
import {
  userValidationRules,
  userValidator,
} from "../validations/user.validator.js";

import {
  hashPassword,
  verifyPassword,
  generateAuthToken,
} from "./user.middlewares.js";

const userRouter = Router();

// Note(future development):the validation logic should go to the databse layer
userRouter.post(
  "/register",
  userValidationRules(),
  userValidator,
  hashPassword,
  registerUser,
  generateAuthToken
);

userRouter.post(
  "/login",
  userValidationRules(),
  userValidator,
  loginUser,
  verifyPassword,
  generateAuthToken
);

export default userRouter;
