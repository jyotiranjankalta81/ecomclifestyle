"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class CountryInstance extends sequelize_1.Model {
}
exports.CountryInstance = CountryInstance;
CountryInstance.init({
    COUNTRY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    COUNTRY_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    COUNTRY_CODE: {
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
    tableName: 'tbl_country',
});
//# sourceMappingURL=country.model.js.map