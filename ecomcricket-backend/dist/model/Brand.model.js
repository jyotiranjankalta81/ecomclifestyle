"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class BrandInstance extends sequelize_1.Model {
}
exports.BrandInstance = BrandInstance;
BrandInstance.init({
    BRAND_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    BRAND_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    BRAND_IMAGE: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    BRAND_STATUS: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_brands',
});
//# sourceMappingURL=Brand.model.js.map