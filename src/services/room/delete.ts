import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

class DeleteRoomService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(roomId: string): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve, reject) => {
      if (!roomId) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "One or more fields are missing",
        });
      }

      await this.prisma.room.delete({
        where: {
          id: roomId,
        },
      });

      resolve({
        code: HTTP_CODES.OK,
        data: null,
        status: "SUCCESS",
        message: `Room - ${roomId} deleted successfully`,
      });
    });
  }
}

export default DeleteRoomService;
