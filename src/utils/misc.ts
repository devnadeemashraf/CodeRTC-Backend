import { TServerResponseStatus } from "../types/services";

export class AppError extends Error {
  public readonly code: number;
  public readonly status: TServerResponseStatus;
  public readonly error: string;
  public readonly message: string;
  public readonly data: null;

  constructor(
    code: number,
    error: string,
    status: TServerResponseStatus,
    message: string
  ) {
    super();

    this.code = code;
    this.status = status;
    this.error = error;
    this.message = message;
    this.data = null;
  }
}
