import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import { BrandAttributes } from "../interface/admin.interface";

export class BrandInstance extends Model<BrandAttributes> {}
BrandInstance.init(
  {
    BRAND_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    BRAND_NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BRAND_CODE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BRAND_IMAGE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BRAND_STATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "tbl_brands",
  }
);
