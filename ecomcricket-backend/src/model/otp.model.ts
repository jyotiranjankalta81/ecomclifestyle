import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { OtpAttributes, UserAttributes, userroleinterface } from '../interface/auth.interface';

export class OtpInstance extends Model<OtpAttributes> { }
OtpInstance.init(
    {
        OTP_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        USER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        OTP: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ISDELETED: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_Otp',
    }
);

