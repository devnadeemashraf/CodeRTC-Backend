import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { HTTP_CODES, HTTP_RESPONSE } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";
import { TokenPayload } from "../../types/frameworks";
import BcryptDriver from "../../frameworks/bcryptDriver";
import { ALL_FIELDS_IN_RESPONSE } from "../room/constants";
import { generateSlug } from "random-word-slugs";

interface ICreateRoomParams {
  topic: string;
  description: string;
  tags: string[];
  isProtected: boolean;
  passcode: string;
  language: string;
}

class CreateRoomService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  exec(
    user: TokenPayload,
    {
      topic,
      description,
      tags,
      isProtected,
      passcode,
      language,
    }: ICreateRoomParams
  ): Promise<IServerResponseWithCode> {
    // Currently Supports only Topic and Description
    return new Promise(async (resolve, reject) => {
      if (
        !topic ||
        isProtected == null ||
        isProtected == undefined ||
        (isProtected && !passcode && passcode != "") ||
        !language
      ) {
        return resolve({
          code: HTTP_CODES.BAD_REQUEST,
          error: HTTP_RESPONSE.BAD_REQUEST,
          status: "ERROR",
          message: "One or more fields are missing",
        });
      }

      let passcodeHash = "";
      if (isProtected) {
        passcodeHash = await BcryptDriver.hash(passcode);
      }

      const randomSlug = String(generateSlug() + "-" + Date.now());

      // Can check in future if the title contains some bad word here
      const createdRoomInDatabase = await this.prisma.room.create({
        data: {
          id: randomSlug,
          topic,
          isProtected,
          passcode: passcodeHash,
          language: "JavaScript",
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
        include: ALL_FIELDS_IN_RESPONSE,
      });

      resolve({
        code: HTTP_CODES.OK,
        data: createdRoomInDatabase,
        status: "SUCCESS",
        message: "Created Room Successfully",
      });
    });
  }
}

export default CreateRoomService;
