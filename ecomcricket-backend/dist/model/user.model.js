"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
const userrole_1 = require("./userrole");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    USERROLE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    PROFILE_PIC: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    FULLNAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    MOBILENO: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    EMAIL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PASSWORD: {
        type: sequelize_1.DataTypes.TEXT(),
        allowNull: true,
    },
    EMAILSTATUS: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_user',
});
userrole_1.RoleInstance.hasOne(UserInstance, {
    foreignKey: {
        name: 'USERROLE',
        allowNull: false
    }
});
UserInstance.belongsTo(userrole_1.RoleInstance, {
    foreignKey: {
        name: 'USERROLE',
        allowNull: false
    }
});
//# sourceMappingURL=user.model.js.map