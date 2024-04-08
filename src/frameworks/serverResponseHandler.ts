import { Response } from "express";

import { IServerResponseWithCode } from "../interface/services";

type TServerResponse = IServerResponseWithCode & {
  response: Response;
};

export const serverResponse: (
  params: TServerResponse
) => Response<any, Record<string, any>> = ({
  response,
  code,
  status,
  error,
  message,
  data,
}) => {
  return response.status(code).json({
    status,
    error: error ? error : null,
    message,
    data: data ? data : null,
  });
};
