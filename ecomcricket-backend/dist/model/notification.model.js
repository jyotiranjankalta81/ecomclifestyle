"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class NotificationInstance extends sequelize_1.Model {
}
exports.NotificationInstance = NotificationInstance;
NotificationInstance.init({
    NId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    TITLE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    MESSAGE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    DATE: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: "tbl_notifications",
});
//# sourceMappingURL=notification.model.js.map