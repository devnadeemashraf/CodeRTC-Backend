import { v4 as uuidV4 } from "uuid";

import { ALL_FIELDS_IN_RESPONSE } from "./constants";
import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

import { PrismaClient } from "@prisma/client";

import BcryptDriver from "../../frameworks/bcryptDriver";
import JwtDriver from "../../frameworks/jwtDriver";

interface IRegisterService {
  name: string;
  username: string;
  profileImage: string;
  password: string;
}

class RegisterService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec({
    name,
    username,
    profileImage,
    password,
  }: IRegisterService): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve) => {
      if (
        !name ||
        !username ||
        !password ||
        (profileImage != "" && !profileImage)
      ) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          data: null,
          message: "One or more fileds are missing",
        });
      }

      if (username.trim().split(" ").length > 1) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          data: null,
          message: "Username needs to be one word",
        });
      }

      const userFoundInDatabase = await this.prisma.user.findUnique({
        where: {
          username,
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      if (userFoundInDatabase) {
        return resolve({
          code: HTTP_CODES.CONFLICT,
          error: HTTP_RESPONSE.CONFLICT,
          status: "ERROR",
          data: null,
          message: "Username already exists",
        });
      }

      const id = uuidV4();

      const objectToSign = {
        id,
        username,
      };
      const accessToken = JwtDriver.sign(objectToSign, "access_token");

      // Hash Password
      const passwordHash = await BcryptDriver.hash(password);
      const userCreatedInDatabase = await this.prisma.user.create({
        data: {
          id,
          name,
          username,
          passwordHash,
          session: {
            create: {
              accessToken,
              refreshToken: "",
            },
          },
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      return resolve({
        code: HTTP_CODES.OK,
        error: null,
        status: "SUCCESS",
        data: { user: userCreatedInDatabase, accessToken },
        message: "Registration Success",
      });
    });
  }
}

export default RegisterService;
