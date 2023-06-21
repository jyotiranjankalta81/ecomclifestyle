import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import {
  CartAttributes,
  AddressAttributes,
  CategoryAttributes,
  ProductAttributes,
} from "../interface/admin.interface";

export class AddressInstance extends Model<AddressAttributes> {}
AddressInstance.init(
  {
    ADDRESS_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ADDRESS_USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FULLNAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PHONE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FLAT: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    STREET: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LANDMARK: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CITY: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    STATE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    COUNTRY: {
      type: DataTypes.STRING,
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
    tableName: "tbl_address",
  }
);
