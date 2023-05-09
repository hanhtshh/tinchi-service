"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class Class extends sequelize_1.Model {
    static initModel(sequelize) {
        Class.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            subject_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            group: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "OPEN",
            },
            max_student: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            total_student: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            createdAt: "created_at",
            updatedAt: "updated_at",
            indexes: [
                {
                    fields: ["status"],
                },
            ],
            modelName: models_constant_1.MODEL_NAME.CLASS,
            schema: models_constant_1.SCHEMA,
            timestamps: true,
        });
        return Class;
    }
}
exports.Class = Class;
