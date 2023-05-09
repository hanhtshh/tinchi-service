"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class Subject extends sequelize_1.Model {
    static initModel(sequelize) {
        Subject.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            tinchi_number: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: models_constant_1.MODEL_NAME.SUBJECT,
            schema: models_constant_1.SCHEMA,
            timestamps: true,
        });
        return Subject;
    }
}
exports.Subject = Subject;
