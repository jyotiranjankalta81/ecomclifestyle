import { app } from "./server";
import { config } from "./config/config";
import { log } from "./config/logger";
import { sequelizeDB } from "./db/db-connection";
import multer from "multer";

const server = app.listen(config.port, () => {
  sequelizeDB
    .authenticate()
    .then(() => {
      log.info(`Listening to port ${config.port}`);
      sequelizeDB
        .sync({ alter: true })
        .then((result: any) => {
          log.info(`Listening to port ${config.port}`);
          log.info(`Database is connected ${config.db.host}`);
          log.info(`Data is sync`);
        })
        .catch((error: Error) => {
          console.log(error, "error in sync");
        });
    })
    .catch((err: any) => {
      log.error("error", err);
    });
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      log.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  log.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  log.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
