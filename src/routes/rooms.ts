import { Router } from "express";

import RoomsController from "../controllers/rooms";
import authMiddleware from "../middlewares/auth";

const roomsRouter = Router();

roomsRouter.post("/open", authMiddleware, RoomsController.createNewRoom);
roomsRouter.post(
  "/close/:roomId",
  authMiddleware,
  RoomsController.createNewRoom
);
roomsRouter.post(
  "/join/:roomId",
  authMiddleware,
  RoomsController.createNewRoom
);

export default roomsRouter;
