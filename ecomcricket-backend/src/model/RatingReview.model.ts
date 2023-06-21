import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import {
  CartAttributes,
  AddRatingReview,
  CategoryAttributes,
  ProductAttributes,
} from "../interface/admin.interface";

export class RatingReviewInstance extends Model<AddRatingReview> {}
RatingReviewInstance.init(
  {
    RATINGREVIEW_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PRODUCT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RATING: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    REVIEWS: {
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
    tableName: "tbl_ratingreviews",
  }
);
