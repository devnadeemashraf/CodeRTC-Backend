import { Server, Socket } from "socket.io";

function RoomEventsSocketService(io: Server, socket: Socket) {
  socket.on("ON_DELETE_ROOM", async (payload) => {
    const { user, room } = payload;

    io.to(room.id).emit("FORCE_KICK_CONNECTED_USERS", {
      owner: user.id,
      roomId: room.id,
      message: "The room was deleted by its owner.",
    });
  });
}

export default RoomEventsSocketService;
