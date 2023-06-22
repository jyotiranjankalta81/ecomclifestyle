"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config/config");
const logger_1 = require("./config/logger");
const db_connection_1 = require("./db/db-connection");
const server = server_1.app.listen(config_1.config.port, () => {
    db_connection_1.sequelizeDB
        .authenticate()
        .then(() => {
        logger_1.log.info(`Listening to port ${config_1.config.port}`);
        db_connection_1.sequelizeDB
            .sync({ alter: true })
            .then((result) => {
            logger_1.log.info(`Listening to port ${config_1.config.port}`);
            logger_1.log.info(`Database is connected ${config_1.config.db.host}`);
            logger_1.log.info(`Data is sync`);
        })
            .catch((error) => {
            console.log(error, "error in sync");
        });
    })
        .catch((err) => {
        logger_1.log.error("error", err);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.log.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.log.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.log.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map