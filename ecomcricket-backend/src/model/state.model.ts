import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { StateAttributes } from '../interface/admin.interface';
import { CountryInstance } from './country.model';

export class StateInstance extends Model<StateAttributes> { }
StateInstance.init(
    {
        STATE_ID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        STATE_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        COUNTRY_ID: {
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
        tableName: 'tbl_state',
    }
);


CountryInstance.hasOne(StateInstance,{
    foreignKey: {
        name: 'COUNTRY_ID',
        allowNull: false
      }
});
StateInstance.belongsTo(CountryInstance,{
    foreignKey: {
        name: 'COUNTRY_ID',
        allowNull: false
      }
});
