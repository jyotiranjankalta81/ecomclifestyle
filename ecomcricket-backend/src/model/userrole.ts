import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { UserAttributes, userroleinterface } from '../interface/auth.interface';

export class RoleInstance extends Model<userroleinterface> { }
RoleInstance.init(
    {
        ROLE_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        ROLE_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ROLE_DESC: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_role',
    }
);

