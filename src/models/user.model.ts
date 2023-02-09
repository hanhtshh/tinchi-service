import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";

export interface UserAttributes {
  //Default
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: number;
}

export type UserCreateAttributes = Optional<UserAttributes, "id">;

export class User
  extends Model<UserAttributes, UserCreateAttributes>
  implements UserAttributes
{
  //Default
  id!: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;
  name!: string;
  email!: string;
  phone_number!: string;
  password!: string;
  role!: number;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: MODEL_NAME.USER,
        schema: SCHEMA,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );

    return User;
  }
}
