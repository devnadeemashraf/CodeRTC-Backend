import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import { ALL_FIELDS_IN_RESPONSE } from "./constants";

import { TokenPayload } from "../../types/frameworks";

class GetAllRoomsAssociatedWithUserService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(user: TokenPayload): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve, reject) => {
      if (!user) {
        return resolve({
          code: HTTP_CODES.UNAUTHORIZED,
          error: HTTP_RESPONSE.UNAUTHORIZED,
          data: null,
          status: "ERROR",
          message: "Invalid Request",
        });
      }

      const { id } = user;
      const roomsAssociatedWithUserInDatabase =
        await this.prisma.user.findUnique({
          where: {
            id,
          },
          select: {
            createdRooms: {
              include: ALL_FIELDS_IN_RESPONSE,
            },
            joinedRooms: {
              include: ALL_FIELDS_IN_RESPONSE,
            },
          },
        });

      // Cache this response

      return resolve({
        code: HTTP_CODES.OK,
        data: roomsAssociatedWithUserInDatabase,
        status: "SUCCESS",
        message: "Fetched Rooms associated with User",
      });
    });
  }
}

export default GetAllRoomsAssociatedWithUserService;
