import express, { Express, Response, Request } from "express";
import { AuthController } from "../../controller/auth.controller";
import { validate } from "../../middlewares/validate";
import { auth } from "../../middlewares/auth";
import {
  loginValidation,
  otploginValidation,
  registerValidation,
  verifyotpValidation,
} from "../../validation/AuthValidation";
const authrouter = express.Router();

authrouter.post("/register", AuthController.CreateUser);
authrouter.post(
  "/login",
  validate(loginValidation.body),
  AuthController.LoginUser
);
authrouter.post(
  "/login-withotp",
  validate(otploginValidation.body),
  AuthController.LoginWithOtp
);
authrouter.post(
  "/verify-otp",
  validate(verifyotpValidation.body),
  AuthController.verifyOtp
);
authrouter.post("/forgot-password", AuthController.ForgotPassword);
authrouter.get("/user", auth(), AuthController.getUser);
authrouter.get("/users", auth(), AuthController.getUsers);
authrouter.put("/user", auth(), AuthController.updateUser);

export default authrouter;
