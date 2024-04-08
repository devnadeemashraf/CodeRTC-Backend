import { PrismaClient } from "@prisma/client";

import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import BcryptDriver from "../../frameworks/bcryptDriver";

class VerifyPasscodeService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec({
    passcode,
    passcodeHash,
  }: {
    passcode: string;
    passcodeHash: string;
  }): Promise<IServerResponseWithCode> {
    return new Promise(async (resolve, reject) => {
      if (!passcode || !passcodeHash) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "One or more fields are missing",
        });
      }
      const passcodeMatches = await BcryptDriver.verify(passcode, passcodeHash);

      if (!passcodeMatches) {
        return resolve({
          code: HTTP_CODES.UNAUTHORIZED,
          error: HTTP_RESPONSE.UNAUTHORIZED,
          status: "ERROR",
          message: "Invalid Passcode",
        });
      } else {
        return resolve({
          code: HTTP_CODES.OK,
          status: "SUCCESS",
          message: "Passcode Matches! You can now continue.",
        });
      }
    });
  }
}

export default VerifyPasscodeService;
