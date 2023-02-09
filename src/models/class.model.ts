import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";

export interface ClassAttributes {
  id?: number;
  name?: string;
  status?: string;
  max_student?: number;
  tinchi_number?: number;
  total_student?: number;
}

export type ClassCreateAttributes = Optional<ClassAttributes, "id">;

export class Class
  extends Model<ClassAttributes, ClassCreateAttributes>
  implements ClassAttributes
{
  id!: number;
  status!: string;
  max_student!: number;
  tinchi_number!: number;
  total_student!: number;
  static initModel(sequelize: Sequelize): typeof Class {
    Class.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        max_student: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        tinchi_number: {
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
        modelName: MODEL_NAME.USER_CLASS,
        schema: SCHEMA,
        timestamps: false,
      }
    );

    return Class;
  }
}
