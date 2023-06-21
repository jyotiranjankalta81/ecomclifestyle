"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
class RoleInstance extends sequelize_1.Model {
}
exports.RoleInstance = RoleInstance;
RoleInstance.init({
    ROLE_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    ROLE_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ROLE_DESC: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_role',
});
//# sourceMappingURL=userrole.js.map