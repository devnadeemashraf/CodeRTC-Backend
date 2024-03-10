import * as jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (
  token: string,
  type: "access_token" | "refresh_token"
) => {
  if (!token) {
    return false;
  }

  return new Promise<boolean>((resolve, reject) => {
    const tokenSecret =
      type == "access_token"
        ? process.env.JWT_SECRET_ACCESS!
        : process.env.JWT_SECRET_REFRESH!;

    const isValid = jwt.verify(token, tokenSecret);
    if (isValid) {
      resolve(true);
    } else {
      reject(false);
    }
  });
};

export const decodeToken = async (token: string) => {
  if (!token) {
    return null;
  }

  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    const decodedUser = jwt.decode(token, {
      json: true,
    });
    if (decodedUser) {
      resolve(decodedUser);
    } else {
      reject(null);
    }
  });
};

export const generateToken = (
  payload: any,
  type: "access_token" | "refresh_token"
) => {
  if (!payload) {
    return null;
  }

  const tokenSecret =
    type == "access_token"
      ? process.env.JWT_SECRET_ACCESS!
      : process.env.JWT_SECRET_REFRESH!;

  return new Promise<any>((resolve, reject) => {
    const token = jwt.sign(payload, tokenSecret);
    if (token) {
      resolve(token);
    } else {
      reject(null);
    }
  });
};
