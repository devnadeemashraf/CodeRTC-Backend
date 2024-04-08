import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import { ALL_FIELDS_IN_RESPONSE } from "./constants";

class SaveCodeChangesService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(roomId: string, codeContent: string): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve) => {
      if (!roomId) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          data: null,
          status: "ERROR",
          message: "One or more fields are missing",
        });
      }

      const updatedRoom = await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          codeContent,
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      return resolve({
        code: HTTP_CODES.OK,
        data: updatedRoom,
        status: "SUCCESS",
        message: "Saved Code Content to Cloud",
      });
    });
  }
}

export default SaveCodeChangesService;
