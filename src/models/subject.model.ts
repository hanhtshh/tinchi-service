import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";

export interface SubjectAttributes {
  id?: number;
  name?: string;
  tinchi_number?: number;
}

export type SubjectCreateAttributes = Optional<SubjectAttributes, "id">;

export class Subject
  extends Model<SubjectAttributes, SubjectCreateAttributes>
  implements SubjectAttributes
{
  id!: number;
  status!: string;
  max_student!: number;
  name!: string;
  tinchi_number!: number;
  total_student!: number;
  static initModel(sequelize: Sequelize): typeof Subject {
    Subject.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        tinchi_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: MODEL_NAME.SUBJECT,
        schema: SCHEMA,
        timestamps: true,
      }
    );

    return Subject;
  }
}
