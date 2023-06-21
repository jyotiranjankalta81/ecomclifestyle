"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class OrderInstance extends sequelize_1.Model {
}
exports.OrderInstance = OrderInstance;
OrderInstance.init({
    ORDER_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    ORDER_REFNO: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        defaultValue: sequelize_1.UUIDV4
    },
    CREATED_BY: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ODR_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    USER_ORDER: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    PAYMENT_ID: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    PAYMENT_AT: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
    },
    AMOUNT: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    TYPE_OF_PAYMENT: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ORDER_STATUS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ORDER_DELIVERY_DATE: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    USER_ADDRESS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: "tbl_order",
});
//# sourceMappingURL=order.model.js.map