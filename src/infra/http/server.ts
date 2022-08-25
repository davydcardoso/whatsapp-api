import "@/config/bootstrap";
import "@/config/folder-management";

import express, { Express, Request, Response, NextFunction } from "express";

import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cookieParser from "cookie-parser";
import http, { Server } from "http";
import { AppError } from "./errors/app-errors";
import { logger } from "@/utils/logger";
import { routes } from "./routes";
import multer, { publicFolder } from "@/config/multer";

class App {
  application: Express;
  server: Server;

  constructor() {
    this.application = express();
    Sentry.init({
      dsn: process.env.SENTRY_KEY,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.application }),
      ],
      tracesSampleRate: Number(process.env.SENTRY_PERCENT),
      environment: process.env.NODE_ENV,
    });

    this.server = http.createServer(this.application);

    this.socket();
    this.middlewares();
  }

  socket() {}

  middlewares() {
    this.application.use(cors({ origin: "*" }));
    this.application.use(morgan("tiny"));
    this.application.use(cookieParser());
    this.application.use(Sentry.Handlers.requestHandler());

    this.application.use(
      express.json({ type: ["application/json", "text/plain"], limit: "120mb" })
    );

    this.application.use(
      "/api/rocketapps/public",
      express.static(publicFolder)
    );

    this.application.get(
      "/api/waapi/status",
      (request: Request, response: Response, next: NextFunction) => {
        response.send({
          developer: "Davyd Cardoso",
          email: "contato@rocketapps.dev",
          version: "0.0.1",
          lastUpdated: "2022-8-25 11:25",
        });
      }
    );

    this.application.use(process.env.API_PREFIX, routes);
  }

  exceptionHandler(): void {
    this.application.use(Sentry.Handlers.errorHandler());

    this.application.use(
      async (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          logger.warn(err);
          return res.status(err.statusCode).json({ error: err.message });
        }

        logger.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    );
  }
}

const startApplicationServer = new App().server;

startApplicationServer.timeout = 500000;
startApplicationServer.listen(process.env.API_PORT, () => {
  logger.info(`HTTP -> Server started success | Port ${process.env.API_PORT}`);
});
