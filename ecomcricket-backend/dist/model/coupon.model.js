"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class CouponInstance extends sequelize_1.Model {
}
exports.CouponInstance = CouponInstance;
CouponInstance.init({
    COUPON_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    COUPON_CODE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    COUPON_MAXDISCOUNT: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    COUPON_EXPIRE: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    COUPON_IMAGE: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    COUPON_MINPRICE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    COUPON_DISCOUNTPERCENT: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    COUPON_MINORDER: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    COUPON_VALIDITY: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ADDED_BY: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: "tbl_Coupons",
});
//# sourceMappingURL=coupon.model.js.map