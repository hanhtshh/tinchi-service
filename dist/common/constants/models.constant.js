"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = exports.MODEL_NAME = void 0;
const config_1 = __importDefault(require("../../config"));
const MODEL_NAME = {
    USER: "users",
    CLASS: "classes",
    USER_CLASS: "user_classes",
    SESSION: "sessions",
    CLASS_SESSION: "class_sessions",
    SUBJECT: "subjects",
};
exports.MODEL_NAME = MODEL_NAME;
const SCHEMA = config_1.default.mysql.schema;
exports.SCHEMA = SCHEMA;
