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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepository = void 0;
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
class SessionRepository {
    findOrCreateSession(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Session.findOrCreate({
                where: condition,
            });
            return result;
        });
    }
    getSessionByQuery(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Session.findOne({
                where: condition,
            });
            return result;
        });
    }
    getAllSession(pageSize, current, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (date) {
                const date_check = new Date(date);
                console.log(date_check);
                const where = {
                    date: {
                        [sequelize_1.Op.between]: [
                            new Date(date_check.getTime() - 60 * 60 * 24 * 1000),
                            new Date(date_check.getTime() + 60 * 60 * 24 * 1000),
                        ],
                    },
                };
                const [sessions] = yield Promise.all([
                    models_1.Session.findAll({
                        where,
                        limit: pageSize,
                        offset: pageSize * (current - 1),
                    }),
                ]);
                return [sessions, sessions.length];
            }
            const [sessions, totalRows] = yield Promise.all([
                models_1.Session.findAll({
                    limit: pageSize,
                    offset: pageSize * (current - 1),
                }),
                models_1.Session.count(),
            ]);
            return [sessions, totalRows];
        });
    }
}
exports.sessionRepository = new SessionRepository();
