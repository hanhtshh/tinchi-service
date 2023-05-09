"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class UserClass extends sequelize_1.Model {
    static initModel(sequelize) {
        UserClass.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
            },
            class_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
            },
        }, {
            sequelize,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: models_constant_1.MODEL_NAME.USER_CLASS,
            schema: models_constant_1.SCHEMA,
            timestamps: true,
        });
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
exports.UserClass = UserClass;
