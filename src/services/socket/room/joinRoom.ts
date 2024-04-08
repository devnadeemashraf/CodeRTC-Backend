import { Server, Socket } from "socket.io";

import { PrismaClient } from "@prisma/client";

function JoinRoomSocketService(
  io: Server,
  socket: Socket,
  prismaDriver: PrismaClient
) {
  socket.on("JOIN_ROOM", async (payload) => {
    const { user, room } = payload;
    socket.join(room.id);

    const systemMessage = {
      type: "system",
      content: `${user?.name} has joined`,
      timestamp: new Date(),
    };

    io.to(room.id).emit("USER_JOINED_ROOM", systemMessage);
  });
}

export default JoinRoomSocketService;
