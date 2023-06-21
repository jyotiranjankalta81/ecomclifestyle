import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { ProductSizeAttributes } from '../interface/admin.interface';

export class ProductSizeInstance extends Model<ProductSizeAttributes> { }
ProductSizeInstance.init(
    {
        PRODUCTSIZE_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        PRODUCTSIZE_NAME: {
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
        tableName: 'tbl_ProductSize',
    }
);

