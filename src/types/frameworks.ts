import { JwtPayload } from "jsonwebtoken";

export type TRedisContent =
  | "content_user/id"
  | "content_user/username"
  | "content_user/data"
  | "content_room/id"
  | "content_room/data"
  | "content_room/open";

export type TRedisFlag = "";

export interface TokenPayload extends JwtPayload {
  id: string;
  username: string;
}
