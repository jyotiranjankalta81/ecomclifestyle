"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateInstance = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../db/db-connection");
const country_model_1 = require("./country.model");
class StateInstance extends sequelize_1.Model {
}
exports.StateInstance = StateInstance;
StateInstance.init({
    STATE_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    STATE_NAME: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    COUNTRY_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ISDELETED: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_connection_1.sequelizeDB,
    tableName: 'tbl_state',
});
country_model_1.CountryInstance.hasOne(StateInstance, {
    foreignKey: {
        name: 'COUNTRY_ID',
        allowNull: false
    }
});
StateInstance.belongsTo(country_model_1.CountryInstance, {
    foreignKey: {
        name: 'COUNTRY_ID',
        allowNull: false
    }
});
//# sourceMappingURL=state.model.js.map