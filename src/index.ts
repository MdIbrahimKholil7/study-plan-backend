import { Server } from "http";
import app from "./app";
import { errorlog, logger } from "./shared/logger";
import config from "./config/config";
import mongoose from "mongoose";

process.on("uncaughtException", (error) => {
  errorlog.error("Uncaught Exception:", error);
});

async function bootstrap() {
  try {
    mongoose.connect(config.database_url as string); // connecting to database
    logger.info("😎😋😎 database connection established successfully ✅✅✅");
    const server: Server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info("Server closed");
        });
      }
      process.exit(1);
    };
    const unexpectedErrorHandler = (error: unknown) => {
      errorlog.error(error);
      exitHandler();
    };
    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        server.close();
      }
    });
  } catch (error) {
    errorlog.error(error);
  }
}

bootstrap();
