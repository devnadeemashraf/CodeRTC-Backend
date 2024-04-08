import { HTTP_CODES } from "../../enum";
import { IServerResponseWithCode } from "../../interface/services";

export function GetAllUsersService(): Promise<IServerResponseWithCode> {
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
