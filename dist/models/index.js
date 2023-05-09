"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.Subject = exports.ClassSession = exports.Session = exports.Class = exports.UserClass = exports.User = void 0;
const class_model_1 = require("./class.model");
Object.defineProperty(exports, "Class", { enumerable: true, get: function () { return class_model_1.Class; } });
const classSession_model_1 = require("./classSession.model");
Object.defineProperty(exports, "ClassSession", { enumerable: true, get: function () { return classSession_model_1.ClassSession; } });
const session_model_1 = require("./session.model");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_model_1.Session; } });
const subject_model_1 = require("./subject.model");
Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return subject_model_1.Subject; } });
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
const userClass_model_1 = require("./userClass.model");
Object.defineProperty(exports, "UserClass", { enumerable: true, get: function () { return userClass_model_1.UserClass; } });
const initModels = (sequelize) => {
    user_model_1.User.initModel(sequelize);
    userClass_model_1.UserClass.initModel(sequelize);
    class_model_1.Class.initModel(sequelize);
    session_model_1.Session.initModel(sequelize);
    classSession_model_1.ClassSession.initModel(sequelize);
    subject_model_1.Subject.initModel(sequelize);
    return {
        User: user_model_1.User,
        UserClass: userClass_model_1.UserClass,
        Class: class_model_1.Class,
        Session: session_model_1.Session,
        ClassSession: classSession_model_1.ClassSession,
        Subject: subject_model_1.Subject,
    };
};
exports.initModels = initModels;
