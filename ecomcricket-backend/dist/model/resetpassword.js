"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class ResetInstance extends sequelize_1.Model {
}
exports.ResetInstance = ResetInstance;
ResetInstance.init({
    RESET_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    EMAIL: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    RESET_OTP: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_reset',
});
//# sourceMappingURL=resetpassword.js.map