import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import { CouponAttributes } from "../interface/admin.interface";

export class CouponInstance extends Model<CouponAttributes> {

}

CouponInstance.init(
  {
    COUPON_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    COUPON_CODE: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    COUPON_MAXDISCOUNT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    COUPON_EXPIRE: {
      type: DataTypes.BOOLEAN,
     defaultValue:false,
    },
    COUPON_IMAGE: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    COUPON_MINPRICE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    COUPON_DISCOUNTPERCENT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    COUPON_MINORDER: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    COUPON_VALIDITY: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ADDED_BY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "tbl_Coupons",
  }
);
