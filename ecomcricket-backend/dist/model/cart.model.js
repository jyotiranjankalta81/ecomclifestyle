"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class CartInstance extends sequelize_1.Model {
}
exports.CartInstance = CartInstance;
CartInstance.init({
    CART_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    CART_USER_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    CART_PRODUCT_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    CART_PRODUCT_SIZE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    CART_PRODUCT_COLOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    CART_PRODUCT_QUANTITY: {
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
    tableName: 'tbl_cart',
});
//# sourceMappingURL=cart.model.js.map