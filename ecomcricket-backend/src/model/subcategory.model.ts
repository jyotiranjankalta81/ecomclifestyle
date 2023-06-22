import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import { SubCategoryAttributes } from "../interface/admin.interface";
import { CategoryInstance } from "./category.model";

export class SubCategoryInstance extends Model<SubCategoryAttributes> {}
SubCategoryInstance.init(
  {
    SUBCATEGORY_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // ,

    CATEGORY_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    SUBCATEGORY_NAME: {
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
    tableName: "tbl_SubCategory",
  }
);

CategoryInstance.hasOne(SubCategoryInstance, {
  foreignKey: {
    name: "CATEGORY_ID",
    allowNull: false,
  },
});

SubCategoryInstance.belongsTo(CategoryInstance, {
  foreignKey: {
    name: "CATEGORY_ID",
    allowNull: false,
  },
});
