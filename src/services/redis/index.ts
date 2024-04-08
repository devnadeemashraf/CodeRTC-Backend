import { Redis } from "ioredis";

import { TRedisContent } from "../../types/frameworks";

const REDIS_URI =
  (process.env.NODE_ENV as string) == "development"
    ? "0.0.0.0:6379"
    : (process.env.REDIS_URI as string);

class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(REDIS_URI);
  }

  async get(contentType: TRedisContent, uniqueIdentifier: string) {
    try {
      const data = await this.redis?.get(`${contentType}:${uniqueIdentifier}`);
      if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async setWithTTL(
    contentType: TRedisContent,
    uniqueIdentifier: string,
    value: any,
    ttl: number
  ) {
    try {
      const data = await this.redis?.set(
        `${contentType}:${uniqueIdentifier}`,
        JSON.stringify(value)
      );
      await this.redis?.expire(`${contentType}:${uniqueIdentifier}`, ttl);
      return data;
    } catch (error) {
      return null;
    }
  }

  async set(contentType: TRedisContent, uniqueIdentifier: string, value: any) {
    try {
      const data = await this.redis?.set(
        `${contentType}:${uniqueIdentifier}`,
        JSON.stringify(value)
      );
      return data;
    } catch (error) {
      return null;
    }
  }

  async delete(contentType: TRedisContent, uniqueIdentifier: string) {
    try {
      const data = await this.redis?.del(`${contentType}:${uniqueIdentifier}`);
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}

export default new RedisService();
