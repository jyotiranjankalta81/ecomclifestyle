"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class SessionInstance extends sequelize_1.Model {
}
exports.SessionInstance = SessionInstance;
SessionInstance.init({
    SESSION_ID: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    USERAGENT: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
    },
    UERIP: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    USERID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    SESSION_STATUS: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_session',
});
//# sourceMappingURL=session.model.js.map