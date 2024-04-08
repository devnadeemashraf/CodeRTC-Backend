import "dotenv/config";

import ExpressApp from "./frameworks/web/expressApp";
import SocketServer from "./frameworks/web/socketServer";

const server = new ExpressApp();
const httpServer = server.http;
const io = new SocketServer(httpServer);

server.setupMiddlewares();
server.setupRoutes();

io.setupRoomSockets();

server.setupErrorHandler();

server.run();
