"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moment_tz_vn = exports.getDiffDate = exports.getVnTime = exports.vnDateFormat = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const constants_1 = require("../constants");
moment_timezone_1.default.tz.setDefault(constants_1.TIME_ZONE.VIETNAM);
function vnDateFormat(time, format, locale) {
    moment_timezone_1.default.locale(locale || 'vi');
    return (0, moment_timezone_1.default)(time).tz(constants_1.TIME_ZONE.VIETNAM).format(format);
}
exports.vnDateFormat = vnDateFormat;
function getVnTime(time) {
    return (0, moment_timezone_1.default)(time).tz(constants_1.TIME_ZONE.VIETNAM);
}
exports.getVnTime = getVnTime;
function getDiffDate(start, end) {
    const startMoment = getVnTime(start).startOf('day');
    const endMoment = getVnTime(end).startOf('day');
    return endMoment.diff(startMoment, 'days');
}
exports.getDiffDate = getDiffDate;
exports.moment_tz_vn = moment_timezone_1.default;
