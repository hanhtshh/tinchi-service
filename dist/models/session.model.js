"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class Session extends sequelize_1.Model {
    static initModel(sequelize) {
        Session.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            start_time: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            total_time: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            place: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "405-A2",
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
            modelName: models_constant_1.MODEL_NAME.SESSION,
            schema: models_constant_1.SCHEMA,
            timestamps: true,
        });
        return Session;
    }
}
exports.Session = Session;
