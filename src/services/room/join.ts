import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import BcryptDriver from "../../frameworks/bcryptDriver";

import { ALL_FIELDS_IN_RESPONSE } from "./constants";

class JoinRoomService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(
    roomId: string,
    userId: string,
    passcode: string = "",
    verifying: any = false
  ): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve, reject) => {
      if (!roomId) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "One or more fields are missing",
        });
      }

      // Check if the roomID Entered has passcode
      const roomFoundInDatabase = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });

      if (!roomFoundInDatabase) {
        return resolve({
          code: HTTP_CODES.NOT_FOUND,
          error: HTTP_RESPONSE.NOT_FOUND,
          status: "ERROR",
          message: "Invalid Room ID",
        });
      }

      // Check if Verifying Passcode
      if (verifying && verifying == "true") {
        const passcodeMatches = await BcryptDriver.verify(
          passcode,
          roomFoundInDatabase.passcode!
        );

        if (!passcodeMatches) {
          return resolve({
            code: HTTP_CODES.UNAUTHORIZED,
            error: HTTP_RESPONSE.UNAUTHORIZED,
            status: "ERROR",
            message: "Invalid Passcode",
          });
        } else {
          const updatedRoom = await this.prisma.room.update({
            where: {
              id: roomId,
            },
            data: {
              members: {
                connect: {
                  id: userId,
                },
              },
            },
            include: ALL_FIELDS_IN_RESPONSE,
          });

          return resolve({
            code: HTTP_CODES.OK,
            data: updatedRoom,
            status: "SUCCESS",
            message: "Joined Room",
          });
        }
      } else if (verifying && verifying != "true") {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "Invalid Query Param",
        });
      } else {
        // If a room is protected, server will always return back a pending response
        if (roomFoundInDatabase.isProtected) {
          return resolve({
            code: HTTP_CODES.OK,
            data: {
              requiresPasscode: true,
            },
            status: "SUCCESS",
            message: "This room requires you to enter a passcode to enter.",
          });
        }

        // Control is hear which means the room is public
        // Connect User with room id
        const updatedRoom = await this.prisma.room.update({
          where: {
            id: roomId,
          },
          data: {
            members: {
              connect: {
                id: userId,
              },
            },
          },
          include: ALL_FIELDS_IN_RESPONSE,
        });

        return resolve({
          code: HTTP_CODES.OK,
          data: updatedRoom,
          status: "SUCCESS",
          message: "Joined Room",
        });
      }
    });
  }
}

export default JoinRoomService;
