import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { bannerAttributes } from '../interface/admin.interface';

export class BannnerInstance extends Model<bannerAttributes> { }
BannnerInstance.init(
    {
        BANNER_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        BANNER_DESC: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        BANNER_IMAGE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CREATED_BY: {
            type: DataTypes.INTEGER,
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
        tableName: 'tbl_banner',
    }
);

