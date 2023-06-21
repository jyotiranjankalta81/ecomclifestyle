import { DataTypes, Model ,Sequelize} from "sequelize";
import { sequelizeDB } from "../db/db-connection";
import { NotificationAttributes } from "../interface/admin.interface";


export class NotificationInstance extends Model<NotificationAttributes>{}
NotificationInstance.init(
    {
        NId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        TITLE:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        MESSAGE:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        DATE:{
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }

    },
    {
        sequelize:sequelizeDB,
        tableName : "tbl_notifications",
    }
)