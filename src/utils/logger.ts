import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    mkdir: true,
  },
});

export { logger };
