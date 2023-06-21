import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { resetinterface } from '../interface/auth.interface';


export class ResetInstance extends Model<resetinterface> {
}
ResetInstance.init(
    {
        RESET_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        EMAIL: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        RESET_OTP: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_reset',
    }
);

