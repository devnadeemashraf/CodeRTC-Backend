import { Server } from "socket.io";

import JoinRoomSocketService from "./joinRoom";
import LeaveRoomSocketService from "./leaveRoom";
import MessageInRoomSocketService from "./messageInRoom";
import CodeUpdatesInRoomSocketService from "./codeUpdatesInRoom";

import prismaDriver from "../../../frameworks/prismaDriver";
import RoomEventsSocketService from "./roomEvents";

function SetupRoomSocketService(io: Server) {
  io.on("connect", (socket) => {
    // Get Room ID from the connection and join user to that room
    JoinRoomSocketService(io, socket, prismaDriver);

    RoomEventsSocketService(io, socket);

    MessageInRoomSocketService(io, socket);

    CodeUpdatesInRoomSocketService(io, socket);

    LeaveRoomSocketService(io, socket);
  });
}

export default SetupRoomSocketService;
