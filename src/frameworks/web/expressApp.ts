import "dotenv/config";

import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { Server, createServer } from "http";

import ExpressRateLimit from "./expressRateLimiter";

// import { authMiddleware } from "../../middlewares/authMiddleware";
import { errorHandler } from "../errorHandler";

// Routes
import authRoute from "../../routes/authRoute";
import userRoute from "../../routes/userRoute";
import roomRoute from "../../routes/roomRoute";

import { CORS_CONFIG } from "../../config";

class ExpressApp {
  public readonly app: Express;
  public readonly http: Server;

  constructor() {
    this.app = express();
    this.http = createServer(this.app);
  }

  setupMiddlewares() {
    this.app.use(cors(CORS_CONFIG));
    this.app.use(express.json());
    this.app.use(cookieParser());

    // Rate Limiter
    // 10 Requests per minute
    const limiter = new ExpressRateLimit(1 * 60 * 1000, 20).getRequestHandler();

    this.app.use(limiter);
  }

  setupRoutes() {
    this.app.use("/api/v1/auth", authRoute);
    this.app.use("/api/v1/user", userRoute);
    this.app.use("/api/v1/room", roomRoute);
  }

  setupErrorHandler() {
    this.app.use(errorHandler); // Error Handler
  }

  run() {
    const PORT = process.env.PORT || 3001;
    return this.http.listen(PORT, () => {
      console.log(`Express App Running on PORT: ${PORT}`);
    });
  }
}

export default ExpressApp;
