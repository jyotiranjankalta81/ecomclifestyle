import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import {
  CategoryAttributes,
  ProductAttributes,
} from "../interface/admin.interface";

export class ProductInstance extends Model<ProductAttributes> {}
ProductInstance.init(
  {
    PRODUCT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    CATEGORY_ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SUBCATEGORY_ID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BRAND_ID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PRODUCTSIZE_ID: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    PRODUCTCOLOR_ID: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    PRODUCT_NAME: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    PRODUCT_QUANTITY: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    PRODUCT_DESCRIPTION: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    PRODUCT_PRICE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    PRODUCT_DISCOUNT: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    PRODUCT_DISCOUNTSTATUS: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    PRODUCT_TAG: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    PRODUCT_IMAGE: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    PRODUCT_BARCODE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    COMPANYCODE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WEIGHT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PACKAGETYPE: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Parcel",
    },
    BRANCHNAME: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TECHINFO: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ADDITINFO: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ISDELETED: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeDB,
    tableName: "tbl_product",
  }
);
