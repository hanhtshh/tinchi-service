"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
const httpStatus_enum_1 = __importDefault(require("./httpStatus.enum"));
const ERRORS = {
    UNAUTHORIZED: {
        message: 'UNAUTHORIZED',
        status: httpStatus_enum_1.default.FORBIDDEN
    }
};
exports.ERRORS = ERRORS;
