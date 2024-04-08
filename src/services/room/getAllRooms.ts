import { PrismaClient } from "@prisma/client";

import { HTTP_CODES } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

class GetAllRoomsService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec({
    countFrom,
    countTo,
  }: {
    countFrom: number;
    countTo: number;
  }): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve, reject) => {
      const allRoomsInDatabase = await this.prisma.room.findMany({
        skip: countFrom,
        take: countTo,
      });

      resolve({
        code: HTTP_CODES.OK,
        error: null!,
        data: allRoomsInDatabase,
        status: "SUCCESS",
        message: "Okay",
      });
    });
  }
}

export default GetAllRoomsService;
