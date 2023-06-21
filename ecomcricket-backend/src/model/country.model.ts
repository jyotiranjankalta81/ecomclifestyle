import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { CategoryAttributes, CountryAttributes } from '../interface/admin.interface';

export class CountryInstance extends Model<CountryAttributes> { }
CountryInstance.init(
    {
        COUNTRY_ID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        COUNTRY_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        COUNTRY_CODE: {
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
        tableName: 'tbl_country',
    }
);

