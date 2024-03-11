import { NextFunction, Request, Response } from "express";

import { decodeToken, verifyToken } from "../utils/tokens";

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { access_token_crtc } = request.cookies;

  // Authenticate Cookie
  const isAuthenticated = await verifyToken(access_token_crtc, "access_token");

  // Return Unauthorized if not valid cookie
  if (!isAuthenticated) {
    return response.status(400).json({
      message: "Unauthorized",
    });
  }

  // Decode User from Cookie
  const signedInUser = await decodeToken(access_token_crtc);

  // If No User Info, Return Not Signed In
  if (!signedInUser) {
    return response.status(404).json({
      message: "Cannot Find User, Sign In Again.",
    });
  }

  // Attach Decoded User to Request
  request.user = signedInUser;

  next();
};

export default authMiddleware;
