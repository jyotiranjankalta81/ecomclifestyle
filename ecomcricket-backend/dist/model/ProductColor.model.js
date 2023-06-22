"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductColorInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class ProductColorInstance extends sequelize_1.Model {
}
exports.ProductColorInstance = ProductColorInstance;
ProductColorInstance.init({
    PRODUCTCOLOR_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    PRODUCTCOLOR_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    PRODUCTCOLOR_CODE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PRODUCTCOLOR_IMAGE: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_ProductColor',
});
//# sourceMappingURL=ProductColor.model.js.map