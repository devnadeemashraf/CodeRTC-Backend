import { Request, Response } from "express";

import GetAllRoomsService from "../services/room/getAllRooms";
import GetAllRoomsAssociatedWithUserService from "../services/room/getAllRoomsAssociatedWithUser";
import CreateRoomService from "../services/room/create";
import JoinRoomService from "../services/room/join";
import UpdateRoomService from "../services/room/update";
import DeleteRoomService from "../services/room/delete";

import prismaDriver from "../frameworks/prismaDriver";
import { serverResponse } from "../frameworks/serverResponseHandler";

import { IRoomController } from "../interface/controllers";
import { AppError } from "../utils/misc";
import VerifyPasscodeService from "../services/room/verifyPasscode";
import DetailsService from "../services/room/details";
import SaveCodeChangesService from "../services/room/saveCodeChanges";

class RoomController implements IRoomController {
  async getAllRooms(request: Request, response: Response) {
    const getAllRoomsService = new GetAllRoomsService(prismaDriver);
    const { code, status, message, data, error } =
      await getAllRoomsService.exec({
        countFrom: 0,
        countTo: 10,
      });

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async getAllRoomsAssociatedWithUser(request: Request, response: Response) {
    const user = request.user;

    const getAllRoomsAssociatedWithUserService =
      new GetAllRoomsAssociatedWithUserService(prismaDriver);
    const { code, status, message, data, error } =
      await getAllRoomsAssociatedWithUserService.exec(user);

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async create(request: Request, response: Response) {
    const user = request.user;
    const { topic, description, tags, isProtected, passcode, language } =
      request.body;

    const createRoomService = new CreateRoomService(prismaDriver);
    const { code, status, message, data, error } = await createRoomService.exec(
      user,
      { topic, description, tags, isProtected, passcode, language }
    );

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async join(request: Request, response: Response) {
    const { roomId, userId, passcode } = request.body;
    const { verifying } = request.query;

    const joinRoomService = new JoinRoomService(prismaDriver);
    const { code, status, message, data, error } = await joinRoomService.exec(
      roomId,
      userId,
      passcode,
      verifying
    );

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async update(request: Request, response: Response) {
    const updateRoomService = new UpdateRoomService(prismaDriver);
    const { code, status, message, data, error } =
      await updateRoomService.exec();

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async delete(request: Request, response: Response) {
    const deleteRoomService = new DeleteRoomService(prismaDriver);
    const { code, status, message, data, error } = await deleteRoomService.exec(
      "12"
    );

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async verifyPasscode(request: Request, response: Response) {
    const { passcode, passcodeHash } = request.body;

    const verifyPasscodeService = new VerifyPasscodeService(prismaDriver);
    const { code, status, message, data, error } =
      await verifyPasscodeService.exec({
        passcode,
        passcodeHash,
      });

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async details(request: Request, response: Response) {
    const { roomId } = request.body;

    const detailsService = new DetailsService(prismaDriver);
    const { code, status, message, data, error } = await detailsService.exec(
      roomId
    );

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async saveCodeChanges(request: Request, response: Response) {
    const { roomId, codeContent } = request.body;

    const saveCodeChangesService = new SaveCodeChangesService(prismaDriver);
    const { code, status, message, data, error } =
      await saveCodeChangesService.exec(roomId, codeContent);

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }
}

export default new RoomController();
