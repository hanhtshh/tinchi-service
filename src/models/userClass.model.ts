import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { MODEL_NAME, SCHEMA } from "../common/constants/models.constant";
// import { Class } from "./class.model";
// import { User } from "./user.model";

export interface UserClassAttributes {
  id?: number;
  user_id?: number;
  class_id?: number;
}

export type UserClassCreateAttributes = Optional<UserClassAttributes, "id">;

export class UserClass
  extends Model<UserClassAttributes, UserClassAttributes>
  implements UserClassAttributes
{
  id!: number;
  user_id!: number;
  class_id!: number;
  static initModel(sequelize: Sequelize): typeof UserClass {
    UserClass.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        class_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: MODEL_NAME.USER_CLASS,
        schema: SCHEMA,
        timestamps: false,
      }
    );

    // UserClass.belongsTo(User, {
    //   targetKey: "id",
    //   foreignKey: { name: "user_id" },
    //   as: "users",
    // });
    // User.hasMany(UserClass, {
    //   sourceKey: "id",
    //   foreignKey: { name: "user_id" },
    //   as: "user_classes",
    // });

    // UserClass.belongsTo(Class, {
    //   targetKey: "id",
    //   foreignKey: { name: "class_id" },
    //   as: "classes",
    // });
    // Class.hasMany(UserClass, {
    //   sourceKey: "id",
    //   foreignKey: { name: "class_id" },
    //   as: "user_classes",
    // });

    return UserClass;
  }
}
