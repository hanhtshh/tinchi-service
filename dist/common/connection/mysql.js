"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncConnectMysqlDB = exports.mysqlDB = exports.connectMysqlDB = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
const logger_1 = require("../../logger");
const logger = logger_1.Logger.getInstance(module);
const mysqlDB = {};
exports.mysqlDB = mysqlDB;
const connection = {
    host: config_1.default.mysql.host,
    dialect: "mysql",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        },
    },
    port: config_1.default.mysql.port,
    quoteIdentifiers: false,
    logging: false,
    retry: {
        max: 5,
        match: [sequelize_1.ConnectionError, sequelize_1.ConnectionTimedOutError, sequelize_1.TimeoutError],
    },
    pool: {
        max: 100,
        min: 0,
        acquire: 60000,
        idle: 10000,
    },
};
const sequelize = new sequelize_1.Sequelize(config_1.default.mysql.database, config_1.default.mysql.username, config_1.default.mysql.password, connection);
const connectMysqlDB = () => {
    sequelize
        .authenticate()
        .then(() => {
        logger.info("Connection to mysql has been established successfully");
    })
        .catch((err) => {
        logger.error(`Unable to connect to the mysql database: ${JSON.stringify(config_1.default.mysql.database)} ${JSON.stringify(err)}`);
    });
    mysqlDB.sequelize = sequelize;
    return mysqlDB.sequelize;
};
exports.connectMysqlDB = connectMysqlDB;
const asyncConnectMysqlDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize
        .authenticate()
        .then(() => {
        logger.info("Connection to mysql has been established successfully");
    })
        .catch((err) => {
        logger.error(`Unable to connect to the mysql database: ${JSON.stringify(config_1.default.mysql.database)} ${JSON.stringify(err)}`);
    });
    mysqlDB.sequelize = sequelize;
    return mysqlDB.sequelize;
});
exports.asyncConnectMysqlDB = asyncConnectMysqlDB;
