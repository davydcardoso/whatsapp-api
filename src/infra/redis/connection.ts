import Redis, { RedisOptions } from "ioredis";

const options: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT ?? 6379),
  db: Number(process.env.REDIS_DB ?? 0),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

if (process.env.REDIS_PASS) {
  options.password = process.env.REDIS_PASS;
}

export const RedisConnection = new Redis(options);
