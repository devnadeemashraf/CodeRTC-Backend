import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

class ExpressRateLimit {
  public readonly limiter: RateLimitRequestHandler;

  constructor(windowMs: number, limit: number) {
    this.limiter = rateLimit({
      windowMs, // 1 minute
      limit, // Limit each IP to 1 requests per `window`.
      standardHeaders: "draft-7",
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
      // store: ... , // In-Memory (default), Redis, Memcached.
    });
  }

  getRequestHandler() {
    return this.limiter;
  }
}

export default ExpressRateLimit;
