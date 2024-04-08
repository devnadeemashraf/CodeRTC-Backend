import { Router } from "express";

import roomController from "../controllers/roomController";
import { tryCatch } from "../utils/tryCatch";

import authenticateRequest from "../frameworks/middlewares/authenticateRequest";

const roomRoute = Router();

roomRoute.get(
  "/all",
  authenticateRequest,
  tryCatch(roomController.getAllRooms)
);

roomRoute.get(
  "/user/all",
  authenticateRequest,
  tryCatch(roomController.getAllRoomsAssociatedWithUser)
);

roomRoute.post("/create", authenticateRequest, tryCatch(roomController.create));

roomRoute.post("/join", authenticateRequest, tryCatch(roomController.join));

roomRoute.patch(
  "/update",
  authenticateRequest,
  tryCatch(roomController.update)
);

roomRoute.patch(
  "/save-code-changes",
  authenticateRequest,
  tryCatch(roomController.saveCodeChanges)
);

roomRoute.delete(
  "/delete",
  authenticateRequest,
  tryCatch(roomController.delete)
);

roomRoute.post(
  "/details",
  authenticateRequest,
  tryCatch(roomController.details)
);

roomRoute.post(
  "/verify-passcode",
  authenticateRequest,
  tryCatch(roomController.verifyPasscode)
);

export default roomRoute;
