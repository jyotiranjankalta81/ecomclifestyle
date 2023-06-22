"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeDB = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
let host, dbname, username, password;
if (config_1.config.env === "development") {
    host = config_1.config.db.host;
    dbname = config_1.config.db.name;
    username = config_1.config.db.user;
    password = config_1.config.db.password;
}
else {
    host = config_1.config.proddb.host;
    dbname = config_1.config.proddb.name;
    username = config_1.config.proddb.user;
    password = config_1.config.proddb.password;
}
exports.sequelizeDB = new sequelize_1.Sequelize(dbname, username, password, {
    host: host,
    dialect: 'mysql',
    logging: true,
    pool: { max: 5, min: 0, idle: 10000 },
});
//# sourceMappingURL=db-connection.js.map