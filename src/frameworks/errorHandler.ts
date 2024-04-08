import "dotenv/config";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/misc";
import { HTTP_CODES, HTTP_RESPONSE } from "../enum";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.code).json({
      status: error.status,
      error: error.error,
      message: error.message,
    });
  } else {
    return response.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      error: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      message:
        "Something went wrong on our end. We will look into this as soon as possible!",
      stack: process.env.NODE_ENV == "development" ? error.stack : null,
    });
  }
};
