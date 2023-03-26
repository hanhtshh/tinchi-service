import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";

export interface ClassAttributes {
  id?: number;
  subject_id?: number;
  group?: number;
  status?: string;
  max_student?: number;
  total_student?: number;
}

export type ClassCreateAttributes = Optional<ClassAttributes, "id">;

export class Class
  extends Model<ClassAttributes, ClassCreateAttributes>
  implements ClassAttributes
{
  id!: number;
  subject_id!: number;
  group!: number;
  status!: string;
  max_student!: number;
  name!: string;
  total_student!: number;
  static initModel(sequelize: Sequelize): typeof Class {
    Class.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },

        subject_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        group: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "OPEN",
        },
        max_student: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        total_student: {
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
        modelName: MODEL_NAME.CLASS,
        schema: SCHEMA,
        timestamps: true,
      }
    );

    return Class;
  }
}
