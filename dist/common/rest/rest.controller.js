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
exports.AbstractController = void 0;
const express_1 = require("express");
const logger_1 = require("../../logger");
const httpStatus_enum_1 = __importDefault(require("../constants/httpStatus.enum"));
const res_util_1 = require("./res.util");
class AbstractController {
    constructor(path) {
        this.router = (0, express_1.Router)();
        this.sendError = res_util_1.sendError;
        this.sendSuccess = res_util_1.sendSuccess;
        this.asyncRouteFormatResponse = (fn) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`[${req.method}] [${req.originalUrl}]`);
            this.logger.info(`[PAYLOAD]: ${JSON.stringify(Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params))}`);
            try {
                const result = yield fn(req, res, next);
                return this.sendSuccess(req, res)({
                    data: (result === null || result === void 0 ? void 0 : result.data) || result,
                    code: (result === null || result === void 0 ? void 0 : result.code) || httpStatus_enum_1.default.OK,
                });
            }
            catch (error) {
                return this.sendError(req, res)(error, error === null || error === void 0 ? void 0 : error.status);
            }
        });
        this.validation = (args, func) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = yield func(args);
                return validated;
            }
            catch (error) {
                this.logger.error(`validation error: ${JSON.stringify(error)}`);
                error.status = httpStatus_enum_1.default.BAD_REQUEST;
                throw error;
            }
        });
        this.path = path;
        this.logger = logger_1.Logger.getInstance(module);
    }
}
exports.AbstractController = AbstractController;
