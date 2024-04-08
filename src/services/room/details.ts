import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import BcryptDriver from "../../frameworks/bcryptDriver";
import { ALL_FIELDS_IN_RESPONSE } from "./constants";

class DetailsService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(roomId: string): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve) => {
      if (!roomId) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "Invalid Room ID",
        });
      }

      const roomFoundInDatabase = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      if (!roomFoundInDatabase) {
        return resolve({
          code: HTTP_CODES.NOT_FOUND,
          error: HTTP_RESPONSE.NOT_FOUND,
          status: "ERROR",
          message: "Cannot find any room associated with this room id",
        });
      }

      return resolve({
        code: HTTP_CODES.OK,
        status: "SUCCESS",
        data: roomFoundInDatabase,
        message: "Fetched Room Information Successfully",
      });
    });
  }
}

export default DetailsService;
