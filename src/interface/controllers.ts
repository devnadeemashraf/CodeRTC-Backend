import { Request, Response } from "express";

export interface IUserController {
  getAllUsers(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  find(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  delete(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  update(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
}

export interface IAuthController {
  login(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  register(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  logout(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  authenticationStatus(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
}

export interface IRoomController {
  getAllRooms(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  getAllRoomsAssociatedWithUser(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  create(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  join(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  update(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
  delete(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | void>;
}
