import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import { orderAttributes } from "../interface/admin.interface";

export class OrderInstance extends Model<orderAttributes> {
  USER_ORDER: any;
  ODR_ID: number | undefined;
  PAYMENT_ID: string | undefined;
}
OrderInstance.init(
  {
    ORDER_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ORDER_REFNO: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue:UUIDV4
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ODR_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    USER_ORDER: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    PAYMENT_ID: {
      type: DataTypes.STRING,
      defaultValue:null,
      allowNull: true,
    },
    PAYMENT_AT: {
      type: DataTypes.DATE,
      defaultValue:null,
      allowNull: true,
    },
    AMOUNT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TYPE_OF_PAYMENT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ORDER_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ORDER_DELIVERY_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    USER_ADDRESS: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    ISDELETED: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "tbl_order",
  }
);
