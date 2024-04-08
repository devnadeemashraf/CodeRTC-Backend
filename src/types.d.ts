declare namespace Express {
  export interface Request {
    user: JwtPayload;
    room: JwtPayload;
  }
  export interface Response {
    user: JwtPayload;
    room: JwtPayload;
  }
}
