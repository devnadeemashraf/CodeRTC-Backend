import { Server, Socket } from "socket.io";

function LeaveRoomSocketService(io: Server, socket: Socket) {
  socket.on("LEAVE_ROOM", async (payload) => {
    const { user, room } = payload;

    const systemMessage = {
      type: "system",
      content: `${user?.name} has left`,
      timestamp: new Date(),
    };

    io.to(room.id).emit("USER_LEFT_ROOM", systemMessage);
    socket.leave(room.id);
  });

  socket.on("disconnect", () => {
    console.log("Someone disconnected: ", socket.id);
  });
}

export default LeaveRoomSocketService;
