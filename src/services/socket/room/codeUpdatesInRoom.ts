import { Server, Socket } from "socket.io";

function CodeUpdatesInRoomSocketService(io: Server, socket: Socket) {
  socket.on("ROOM_UPDATES", (payload) => {
    const { user, room, value } = payload;

    room.codeContent = value;

    const updates = {
      user,
      room,
    };

    console.log(updates);

    io.to(room.id).emit("BROADCAST_ROOM_UPDATES", updates);
  });
}

export default CodeUpdatesInRoomSocketService;
