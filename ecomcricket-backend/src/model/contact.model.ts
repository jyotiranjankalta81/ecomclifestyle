import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { CartAttributes,ContactAttributes, CategoryAttributes, ProductAttributes } from '../interface/admin.interface';

export class ContactInstance extends Model<ContactAttributes> { }
ContactInstance.init(
    {
        CONTACT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PHONE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MESSAGE: {
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
        tableName: 'tbl_contact',
    }
);

