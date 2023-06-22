"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
const category_model_1 = require("./category.model");
class SubCategoryInstance extends sequelize_1.Model {
}
exports.SubCategoryInstance = SubCategoryInstance;
SubCategoryInstance.init({
    SUBCATEGORY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    // ,
    CATEGORY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    SUBCATEGORY_NAME: {
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
    tableName: "tbl_SubCategory",
});
category_model_1.CategoryInstance.hasOne(SubCategoryInstance, {
    foreignKey: {
        name: "CATEGORY_ID",
        allowNull: false,
    },
});
SubCategoryInstance.belongsTo(category_model_1.CategoryInstance, {
    foreignKey: {
        name: "CATEGORY_ID",
        allowNull: false,
    },
});
//# sourceMappingURL=subcategory.model.js.map