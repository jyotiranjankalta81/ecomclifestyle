"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class AddressInstance extends sequelize_1.Model {
}
exports.AddressInstance = AddressInstance;
AddressInstance.init({
    ADDRESS_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    ADDRESS_USER_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    FULLNAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    PHONE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    FLAT: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    STREET: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    LANDMARK: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    PIN: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    CITY: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    STATE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    COUNTRY: {
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
    tableName: "tbl_address",
});
//# sourceMappingURL=address.model.js.map