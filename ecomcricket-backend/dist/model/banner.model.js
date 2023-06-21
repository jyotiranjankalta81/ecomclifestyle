"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannnerInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class BannnerInstance extends sequelize_1.Model {
}
exports.BannnerInstance = BannnerInstance;
BannnerInstance.init({
    BANNER_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    BANNER_DESC: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    BANNER_IMAGE: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    CREATED_BY: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_banner',
});
//# sourceMappingURL=banner.model.js.map