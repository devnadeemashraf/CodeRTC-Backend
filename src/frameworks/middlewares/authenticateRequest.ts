import { NextFunction, Request, Response } from "express";

import { AppError } from "../../utils/misc";
import JwtDriver from "../jwtDriver";

import { COOKIES, HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import prismaDriver from "../prismaDriver";

async function authenticateRequest(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { access_token } = request.cookies;

  try {
    if (!access_token) {
      response.clearCookie(COOKIES.ACCESS_TOKEN);

      throw new AppError(
        HTTP_CODES.UNAUTHORIZED,
        HTTP_RESPONSE.UNAUTHORIZED,
        "ERROR",
        "Invalid Token"
      );
    }

    const decodedUserInfo = JwtDriver.decode(access_token);
    const { id, username } = decodedUserInfo;

    // Check if User exists in DB
    const userInDatabase = await prismaDriver.user.findUnique({
      where: {
        id,
      },
    });

    if (!userInDatabase) {
      response.clearCookie(COOKIES.ACCESS_TOKEN);

      throw new AppError(
        HTTP_CODES.UNAUTHORIZED,
        HTTP_RESPONSE.UNAUTHORIZED,
        "ERROR",
        "Invalid User"
      );
    }

    const isValidToken = JwtDriver.verify(access_token, "access_token");
    const hasExpired = JwtDriver.hasExpired(access_token);

    if (!isValidToken || !hasExpired) {
      response.clearCookie(COOKIES.ACCESS_TOKEN);

      throw new AppError(
        HTTP_CODES.UNAUTHORIZED,
        HTTP_RESPONSE.UNAUTHORIZED,
        "ERROR",
        "Invalid Token"
      );
    }

    request.user = userInDatabase;

    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateRequest;
