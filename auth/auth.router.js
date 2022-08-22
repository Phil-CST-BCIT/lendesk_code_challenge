import { Router } from "express";
import { introspectAuthToken } from "./auth.controller.js";
import {
  authValidationRules,
  authValidator,
} from "../validations/auth.validator.js";

const authRouter = Router();

authRouter.post(
  "/introspect",
  authValidationRules(),
  authValidator,
  introspectAuthToken
);

export default authRouter;
