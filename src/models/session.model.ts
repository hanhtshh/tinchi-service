import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";

export interface SessionAttributes {
  id?: number;
  date?: Date;
  start_time?: number;
  total_time?: number;
}

export type SessionCreateAttributes = Optional<SessionAttributes, "id">;

export class Session
  extends Model<SessionAttributes, SessionCreateAttributes>
  implements SessionAttributes
{
  id!: number;
  date!: Date;
  start_time!: number;
  total_time!: number;
  static initModel(sequelize: Sequelize): typeof Session {
    Session.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        start_time: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        total_time: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
          {
            fields: ["status"],
          },
        ],
        modelName: MODEL_NAME.SESSION,
        schema: SCHEMA,
        timestamps: false,
      }
    );

    return Session;
  }
}
