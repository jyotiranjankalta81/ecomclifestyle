"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingReviewInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class RatingReviewInstance extends sequelize_1.Model {
}
exports.RatingReviewInstance = RatingReviewInstance;
RatingReviewInstance.init({
    RATINGREVIEW_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    CREATED_BY: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    PRODUCT_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    RATING: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    REVIEWS: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: "tbl_ratingreviews",
});
//# sourceMappingURL=RatingReview.model.js.map