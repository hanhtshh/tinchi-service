"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            role: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: models_constant_1.MODEL_NAME.USER,
            schema: models_constant_1.SCHEMA,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        });
        return User;
    }
}
exports.User = User;
