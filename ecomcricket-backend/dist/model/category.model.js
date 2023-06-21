"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class CategoryInstance extends sequelize_1.Model {
}
exports.CategoryInstance = CategoryInstance;
CategoryInstance.init({
    CATEGORY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    CATEGORY_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_Category',
});
//# sourceMappingURL=category.model.js.map