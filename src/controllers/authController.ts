import { Request, Response } from "express";

import LoginService from "../services/auth/login";
import RegisterService from "../services/auth/register";
import LogoutService from "../services/auth/logout";
import AuthStatusService from "../services/auth/status";

import JwtDriver from "../frameworks/jwtDriver";
import prismaDriver from "../frameworks/prismaDriver";
import { serverResponse } from "../frameworks/serverResponseHandler";

import { AppError } from "../utils/misc";
import { COOKIES } from "../enum";

import { IAuthController } from "../interface/controllers";

class AuthController implements IAuthController {
  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const loginService = new LoginService(prismaDriver);
    const { code, status, message, data, error } = await loginService.exec({
      username,
      password,
    });

    if (status == "ERROR") {
      throw new AppError(code, error!, status, message);
    }

    const objectToSign = {
      id: data?.id as string,
      username,
    };
    const accessToken = JwtDriver.sign(objectToSign, "access_token");

    // Set Cookie
    response.cookie(COOKIES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
    });

    return serverResponse({
      response,
      code,
      status,
      message,
      data,
      error,
    });
  }

  async register(request: Request, response: Response) {
    const { name, username, profileImage, password } = request.body;

    const registerService = new RegisterService(prismaDriver);
    const { code, status, message, data, error } = await registerService.exec({
      name,
      username,
      profileImage,
      password,
    });

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    // Set Cookie
    response.cookie(COOKIES.ACCESS_TOKEN, data.accessToken, {
      httpOnly: true,
    });

    return serverResponse({
      response,
      code,
      status,
      message,
      data: data.user,
      error,
    });
  }

  async logout(request: Request, response: Response) {
    const userInRequest = request.user;

    const logoutService = new LogoutService(prismaDriver);
    const { code, status, message, data, error } = await logoutService.exec(
      userInRequest
    );

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    // Clear All Cookies
    response.clearCookie(COOKIES.ACCESS_TOKEN);

    return serverResponse({ response, code, status, message, data, error });
  }

  async authenticationStatus(request: Request, response: Response) {
    const userInRequest = request.user;

    const authenticationStatusService = new AuthStatusService(prismaDriver);
    const { code, status, message, data, error } =
      await authenticationStatusService.exec(userInRequest);

    if (status == "ERROR") {
      throw new AppError(code!, error!, status, message);
    }

    return serverResponse({ response, code, status, message, data, error });
  }
}

export default new AuthController();
