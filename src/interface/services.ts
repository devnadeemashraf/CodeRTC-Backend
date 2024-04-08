import { TServerResponseStatus } from "../types/services";

export interface IServerResponseWithCode extends IServerResponse {
  code: number;
}

export interface IServerResponse {
  status: TServerResponseStatus;
  error?: string | null;
  message: string;
  data?: any;
}
