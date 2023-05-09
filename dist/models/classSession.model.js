"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSession = void 0;
const sequelize_1 = require("sequelize");
const models_constant_1 = require("../common/constants/models.constant");
class ClassSession extends sequelize_1.Model {
    static initModel(sequelize) {
        ClassSession.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            class_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
            },
            session_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
            },
        }, {
            sequelize,
            createdAt: "created_at",
            updatedAt: "updated_at",
            modelName: models_constant_1.MODEL_NAME.CLASS_SESSION,
            schema: models_constant_1.SCHEMA,
            timestamps: false,
        });
        // ClassSession.belongsTo(Class, {
        //   targetKey: "id",
        //   foreignKey: { name: "class_id" },
        //   as: "classes",
        // });
        // Class.hasMany(ClassSession, {
        //   sourceKey: "id",
        //   foreignKey: { name: "user_id" },
        //   as: "class_sessions",
        // });
        // ClassSession.belongsTo(Session, {
        //   targetKey: "id",
        //   foreignKey: { name: "session_id" },
        //   as: "sessions",
        // });
        // Session.hasMany(ClassSession, {
        //   sourceKey: "id",
        //   foreignKey: { name: "session_id" },
        //   as: "class_sessions",
        // });
        return ClassSession;
    }
}
exports.ClassSession = ClassSession;
