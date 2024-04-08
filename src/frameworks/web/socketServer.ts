import { Server } from "http";
import { Server as IOServer } from "socket.io";

import { CORS_CONFIG } from "../../config";

import SetupRoomSocketService from "../../services/socket/room";
import RoomInviteNotificationSocketService from "../../services/socket/notification/roomInviteNotification";

class SocketServer {
  private readonly io: IOServer;

  constructor(httpServer: Server) {
    this.io = new IOServer(httpServer, {
      cors: CORS_CONFIG,
    });
  }

  setupRoomSockets() {
    SetupRoomSocketService(this.io);
  }
}

export default SocketServer;
