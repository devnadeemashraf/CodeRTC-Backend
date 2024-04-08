import "dotenv/config";
import jwt from "jsonwebtoken";

import { TokenPayload } from "../types/frameworks";

class JwtDriver {
  static sign(payload: TokenPayload, type: "access_token" | "refresh_token") {
    return jwt.sign(
      payload,
      type == "access_token"
        ? process.env.JWT_SECRET_ACCESS!
        : process.env.JWT_SECRET_REFRESH!,
      {
        expiresIn:
          type == "access_token" ? 60 * 60 * 24 * 7 : 60 * 60 * 24 * 30,
      }
    );
  }

  static verify(token: string, type: "access_token" | "refresh_token") {
    return jwt.verify(
      token,
      type == "access_token"
        ? process.env.JWT_SECRET_ACCESS!
        : process.env.JWT_SECRET_REFRESH!
    ) as TokenPayload;
  }

  static hasExpired(token: string) {
    const decodedToken = this.decode(token);
    if (!decodedToken) {
      return true;
    } else {
      const tokenExpired = decodedToken.exp! < Date.now() / 100;
      return tokenExpired;
    }
  }

  static decode(token: string) {
    return jwt.decode(token) as TokenPayload;
  }
}

export default JwtDriver;
