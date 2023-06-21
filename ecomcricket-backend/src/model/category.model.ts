import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { CategoryAttributes } from '../interface/admin.interface';

export class CategoryInstance extends Model<CategoryAttributes> { }
CategoryInstance.init(
    {
        CATEGORY_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        CATEGORY_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        CATEGORY_CODE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CATEGORY_IMAGE: {
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
        tableName: 'tbl_Category',
    }
);

