"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = exports.sendError = void 0;
const httpStatus_enum_1 = __importDefault(require("../constants/httpStatus.enum"));
const sendError = (req, res) => (err, code = httpStatus_enum_1.default.BAD_GATEWAY) => {
    return res.status(code).send({
        success: false,
        message: err.message,
        meta: Object.assign({}, (req.start && { tooke: Date.now() - req.start }))
    });
};
exports.sendError = sendError;
const sendSuccess = (req, res) => ({ data, code }) => {
    return res.status(code || httpStatus_enum_1.default.OK).send({
        success: true,
        data,
        meta: Object.assign({}, (req.start && { tooke: Date.now() - req.start }))
    });
};
exports.sendSuccess = sendSuccess;
