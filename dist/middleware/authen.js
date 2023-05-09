"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../common/constants");
const httpStatus_enum_1 = __importDefault(require("../common/constants/httpStatus.enum"));
const res_util_1 = require("../common/rest/res.util");
const config_1 = __importDefault(require("../config"));
const error = {
    name: constants_1.ERRORS.UNAUTHORIZED.message,
    message: constants_1.ERRORS.UNAUTHORIZED.message,
};
const allSource = (request, res, next) => {
    // keycloak
    if (request.headers && request.headers.authorization) {
        const authHeader = request.headers.authorization.split(" ");
        const tokenPrefix = authHeader[0];
        const token = authHeader[1];
        const userInfo = jsonwebtoken_1.default.verify(token, config_1.default.token_secret);
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) >= 0 && tokenPrefix === "Bearer") {
            request.userInfo = userInfo;
            return next();
        }
    }
    return (0, res_util_1.sendError)(request, res)(error, httpStatus_enum_1.default.FORBIDDEN);
};
const adminSource = (request, res, next) => {
    // keycloak
    if (request.headers && request.headers.authorization) {
        const authHeader = request.headers.authorization.split(" ");
        const tokenPrefix = authHeader[0];
        const token = authHeader[1];
        const userInfo = jsonwebtoken_1.default.verify(token, config_1.default.token_secret);
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === 2 && tokenPrefix === "Bearer") {
            request.userInfo = userInfo;
            return next();
        }
    }
    return (0, res_util_1.sendError)(request, res)(error, httpStatus_enum_1.default.FORBIDDEN);
};
exports.default = {
    allSource,
    adminSource,
};
