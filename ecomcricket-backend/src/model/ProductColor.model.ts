import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { ProductColorAttributes } from '../interface/admin.interface';

export class ProductColorInstance extends Model<ProductColorAttributes> { }
ProductColorInstance.init(
    {
        PRODUCTCOLOR_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        PRODUCTCOLOR_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },   
         PRODUCTCOLOR_CODE: {
            type: DataTypes.STRING,
            allowNull: true,
        },    
        PRODUCTCOLOR_IMAGE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ISDELETED: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_ProductColor',
    }
);

