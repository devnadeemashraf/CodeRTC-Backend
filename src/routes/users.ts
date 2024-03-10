import { Router } from "express";

import UsersController from "../controllers/users";
import authMiddleware from "../middlewares/auth";

const usesRouter = Router();

usesRouter.post("/register", UsersController.registerNewUser);
usesRouter.post("/login", UsersController.loginUser);

usesRouter.post("/logout", authMiddleware, UsersController.logoutUser);
usesRouter.delete("/delete", authMiddleware, UsersController.deleteUser);
usesRouter.get(
  "/auth-status",
  authMiddleware,
  UsersController.returnAuthStatus
);

export default usesRouter;
