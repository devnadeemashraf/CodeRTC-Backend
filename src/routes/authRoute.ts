import { Router } from "express";

import authController from "../controllers/authController";
import { tryCatch } from "../utils/tryCatch";

import authenticateRequest from "../frameworks/middlewares/authenticateRequest";

const authRoute = Router();

authRoute.post("/login", tryCatch(authController.login));
authRoute.post("/register", tryCatch(authController.register));

authRoute.post("/logout", authenticateRequest, tryCatch(authController.logout));
authRoute.get(
  "/status",
  authenticateRequest,
  tryCatch(authController.authenticationStatus)
);

export default authRoute;
