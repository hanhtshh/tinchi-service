import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";
// import { Class } from "./class.model";
// import { Session } from "./session.model";

export interface ClassSessionAttributes {
  id?: number;
  class_id?: number;
  session_id?: number;
}

export type ClassSessionCreateAttributes = Optional<
  ClassSessionAttributes,
  "id"
>;

export class ClassSession
  extends Model<ClassSessionAttributes, ClassSessionAttributes>
  implements ClassSessionAttributes
{
  id!: number;
  session_id!: number;
  class_id!: number;
  static initModel(sequelize: Sequelize): typeof ClassSession {
    ClassSession.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        class_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        session_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: MODEL_NAME.CLASS_SESSION,
        schema: SCHEMA,
        timestamps: false,
      }
    );

    // ClassSession.belongsTo(Class, {
    //   targetKey: "id",
    //   foreignKey: { name: "class_id" },
    //   as: "classes",
    // });
    // Class.hasMany(ClassSession, {
    //   sourceKey: "id",
    //   foreignKey: { name: "user_id" },
    //   as: "class_sessions",
    // });

    // ClassSession.belongsTo(Session, {
    //   targetKey: "id",
    //   foreignKey: { name: "session_id" },
    //   as: "sessions",
    // });
    // Session.hasMany(ClassSession, {
    //   sourceKey: "id",
    //   foreignKey: { name: "session_id" },
    //   as: "class_sessions",
    // });

    return ClassSession;
  }
}
