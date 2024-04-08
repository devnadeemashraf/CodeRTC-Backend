import { PrismaClient } from "@prisma/client";

import { HTTP_CODES } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

class DeleteRoomService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(roomId: string): Promise<IServerResponseWithCode> {
    return new Promise((resolve, reject) => {
      resolve({
        code: HTTP_CODES.OK,
        error: null!,
        data: null,
        status: "SUCCESS",
        message: "Okay",
      });
    });
  }
}

export default DeleteRoomService;
