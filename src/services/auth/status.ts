import { PrismaClient } from "@prisma/client";
import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

import { TokenPayload } from "../../types/frameworks";
import { ALL_FIELDS_IN_RESPONSE } from "./constants";

class AuthStatusService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(user: TokenPayload): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve) => {
      if (!user) {
        resolve({
          code: HTTP_CODES.UNAUTHORIZED,
          error: HTTP_RESPONSE.UNAUTHORIZED,
          data: null,
          status: "ERROR",
          message: "Invalid Request Payload",
        });
      }

      // Update our user's session in the database
      const userInDatabase = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      return resolve({
        code: HTTP_CODES.OK,
        error: null,
        data: userInDatabase,
        status: "SUCCESS",
        message: "Authenticated",
      });
    });
  }
}

export default AuthStatusService;
