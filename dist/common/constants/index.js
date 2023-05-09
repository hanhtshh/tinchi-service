"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_ZONE = exports.LANGUAGE = exports.SERVICE_NAME = exports.ERRORS = exports.MEDIA_CONSTANTS = void 0;
const errors_constant_1 = require("./errors.constant");
Object.defineProperty(exports, "ERRORS", { enumerable: true, get: function () { return errors_constant_1.ERRORS; } });
const SERVICE_NAME = 'tinchi';
exports.SERVICE_NAME = SERVICE_NAME;
var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["VN"] = "vi";
    LANGUAGE["EN"] = "en";
})(LANGUAGE || (LANGUAGE = {}));
exports.LANGUAGE = LANGUAGE;
exports.MEDIA_CONSTANTS = {
    EXPIRY: 60 * 5, // 15m
};
exports.TIME_ZONE = {
    VIETNAM: 'Asia/Ho_Chi_Minh',
};
