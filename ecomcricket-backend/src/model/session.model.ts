import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { sessionInterface } from '../interface/session.interface';



export class SessionInstance extends Model<sessionInterface> {
    SESSION_ID: any;
}

SessionInstance.init(
    {
        SESSION_ID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        USERAGENT: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0,
        },
        UERIP: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        USERID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SESSION_STATUS: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_session',
    }
);

