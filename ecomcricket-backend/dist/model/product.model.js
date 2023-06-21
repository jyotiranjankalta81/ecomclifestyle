"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class ProductInstance extends sequelize_1.Model {
}
exports.ProductInstance = ProductInstance;
ProductInstance.init({
    PRODUCT_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    CATEGORY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    SUBCATEGORY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    BRAND_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    PRODUCTSIZE_ID: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    PRODUCTCOLOR_ID: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    PRODUCT_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PRODUCT_QUANTITY: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PRODUCT_DESCRIPTION: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    PRODUCT_PRICE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    PRODUCT_DISCOUNT: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    PRODUCT_DISCOUNTSTATUS: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    PRODUCT_TAG: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    PRODUCT_IMAGE: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    PRODUCT_BARCODE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    COMPANYCODE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    WEIGHT: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PACKAGETYPE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "Parcel",
    },
    BRANCHNAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    TECHINFO: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ADDITINFO: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: "tbl_product",
});
//# sourceMappingURL=product.model.js.map