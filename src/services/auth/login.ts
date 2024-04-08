import { PrismaClient } from "@prisma/client";

import { ALL_FIELDS_IN_RESPONSE } from "./constants";
import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

import BcryptDriver from "../../frameworks/bcryptDriver";

interface ILoginService {
  username: string;
  password: string;
}

class LoginService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec({
    username,
    password,
  }: ILoginService): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve) => {
      if (!username || !password) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          data: null,
          message: "One or more fileds are missing",
        });
      }

      const userFoundInDatabase = await this.prisma.user.findUnique({
        where: {
          username,
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      if (!userFoundInDatabase) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          data: null,
          message: "Invalid Username",
        });
      }

      const passwordMatches = await BcryptDriver.verify(
        password,
        userFoundInDatabase?.passwordHash!
      );

      if (!passwordMatches) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          data: null,
          message: "Invalid Password",
        });
      }

      return resolve({
        code: HTTP_CODES.OK,
        error: null,
        status: "SUCCESS",
        data: userFoundInDatabase,
        message: "Login Success",
      });
    });
  }
}

export default LoginService;
