import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { CartAttributes, CategoryAttributes, ProductAttributes } from '../interface/admin.interface';

export class CartInstance extends Model<CartAttributes> { }
CartInstance.init(
    {
        CART_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        CART_USER_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CART_PRODUCT_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CART_PRODUCT_SIZE: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CART_PRODUCT_COLOR: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CART_PRODUCT_QUANTITY: {
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
        tableName: 'tbl_cart',
    }
);

