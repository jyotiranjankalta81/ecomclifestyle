"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizeInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class ProductSizeInstance extends sequelize_1.Model {
}
exports.ProductSizeInstance = ProductSizeInstance;
ProductSizeInstance.init({
    PRODUCTSIZE_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    PRODUCTSIZE_NAME: {
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
    tableName: 'tbl_ProductSize',
});
//# sourceMappingURL=ProductSize.model.js.map