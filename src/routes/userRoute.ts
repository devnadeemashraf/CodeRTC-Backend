import { Router } from "express";

import userController from "../controllers/userController";
import { tryCatch } from "../utils/tryCatch";

import authenticateRequest from "../frameworks/middlewares/authenticateRequest";

const userRoute = Router();

userRoute.get(
  "/all",
  authenticateRequest,
  tryCatch(userController.getAllUsers)
);

userRoute.post("/find", authenticateRequest, tryCatch(userController.find));

userRoute.patch(
  "/update",
  authenticateRequest,
  tryCatch(userController.update)
);

userRoute.delete(
  "/delete",
  authenticateRequest,
  tryCatch(userController.delete)
);

export default userRoute;
