"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class ContactInstance extends sequelize_1.Model {
}
exports.ContactInstance = ContactInstance;
ContactInstance.init({
    CONTACT_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    EMAIL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    PHONE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    MESSAGE: {
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
    tableName: 'tbl_contact',
});
//# sourceMappingURL=contact.model.js.map