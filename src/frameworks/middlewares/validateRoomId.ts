import { NextFunction, Request, Response } from "express";

function validateRoomId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  next();
}

export default validateRoomId;
