"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_controller_1 = __importDefault(require("./modules/class/class.controller"));
const class_service_1 = require("./modules/class/class.service");
const healthCheck_controller_1 = __importDefault(require("./modules/healthCheck/healthCheck.controller"));
const session_controller_1 = __importDefault(require("./modules/session/session.controller"));
const session_service_1 = require("./modules/session/session.service");
const subject_controller_1 = __importDefault(require("./modules/subject/subject.controller"));
const subject_service_1 = require("./modules/subject/subject.service");
const user_controller_1 = __importDefault(require("./modules/user/user.controller"));
const user_service_1 = require("./modules/user/user.service");
const userClass_controller_1 = __importDefault(require("./modules/userClass/userClass.controller"));
const userClass_service_1 = require("./modules/userClass/userClass.service");
const Router = [
    new healthCheck_controller_1.default(),
    new user_controller_1.default(user_service_1.userService),
    new class_controller_1.default(class_service_1.classService),
    new session_controller_1.default(session_service_1.sessionService),
    new userClass_controller_1.default(userClass_service_1.userClassService),
    new subject_controller_1.default(subject_service_1.subjectService),
];
exports.default = Router;
