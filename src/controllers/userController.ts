import { Request, Response } from "express";

import {
  DeleteUserService,
  FindUserService,
  GetAllUsersService,
  UpdateUserService,
} from "../services/user";

import { IUserController } from "../interface/controllers";

import { AppError } from "../utils/misc";
import { serverResponse } from "../frameworks/serverResponseHandler";

class UserController implements IUserController {
  async getAllUsers(request: Request, response: Response) {
    const { code, status, message, data, error } = await GetAllUsersService();

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async find(request: Request, response: Response) {
    const { code, status, message, data, error } = await FindUserService();

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async delete(request: Request, response: Response) {
    const { code, status, message, data, error } = await DeleteUserService();

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }

  async update(request: Request, response: Response) {
    const { updateData } = request.body;

    const { code, status, message, data, error } = await UpdateUserService();

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }
}

export default new UserController();
