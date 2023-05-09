"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const path_1 = __importDefault(require("path"));
dotenv_safe_1.default.config({
    allowEmptyValues: true,
    example: path_1.default.join(__dirname, "../example.env"),
});
const config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        schema: process.env.MYSQL_SCHEMA,
        port: Number(process.env.MYSQL_PORT),
    },
    auth_secret: process.env.AUTH_SECRET,
    token_secret: process.env.TOKEN_SECRET,
    admin_secret: process.env.ADMIN_SECRET,
};
exports.default = config;
