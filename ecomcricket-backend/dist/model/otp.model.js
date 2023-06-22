"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class OtpInstance extends sequelize_1.Model {
}
exports.OtpInstance = OtpInstance;
OtpInstance.init({
    OTP_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    USER_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    OTP: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_Otp',
});
//# sourceMappingURL=otp.model.js.map