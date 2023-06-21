import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../db/db-connection';
import { UserAttributes } from '../interface/auth.interface';
import { RoleInstance } from './userrole';



export class UserInstance extends Model<UserAttributes> { 
    
}
UserInstance.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        USERROLE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        PROFILE_PIC: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        FULLNAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MOBILENO: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PASSWORD: {
            type: DataTypes.TEXT(),
            allowNull: true,
        },
        EMAILSTATUS: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue:false
        },
        ISDELETED: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue:false
        },

    },
    {
        sequelize: sequelizeDB,
        tableName: 'tbl_user',
    }
);

// RoleInstance.hasOne(UserInstance,{
//     foreignKey: {
//         name: 'USERROLE',
//         allowNull: false
//       }
// });
// UserInstance.belongsTo(RoleInstance,{
//     foreignKey: {
//         name: 'USERROLE',
//         allowNull: false
//       }
// });

  
 