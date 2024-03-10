import { NextFunction, Request, Response } from "express";

import { decodeToken, verifyToken } from "../utils/tokens";

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.cookies;

  // Authenticate Cookie
  const isAuthenticated = await verifyToken(accessToken, "access_token");

  // Return Unauthorized if not valid cookie
  if (!isAuthenticated) {
    return response.status(400).json({
      message: "Unauthorized",
    });
  }

  // Decode User from Cookie
  const signedInUser = await decodeToken(accessToken);

  // If No User Info, Return Not Signed In
  if (!signedInUser) {
    return response.status(404).json({
      message: "Not Signed In",
    });
  }

  // Attach Decoded User to Request
  request.user = signedInUser;

  next();
};

export default authMiddleware;
