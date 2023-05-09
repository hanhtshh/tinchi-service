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
exports.subjectRepository = void 0;
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
class SubjectRepository {
    findOrCreateSubject(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Subject.create(condition);
            return result;
        });
    }
    getSubjectByQuery(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Subject.findOne({
                where: condition,
            });
            return result;
        });
    }
    getAllSubject(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [subjects, totalRows] = yield Promise.all([
                models_1.Subject.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: "%" + name + "%",
                        },
                    },
                    limit: pageSize,
                    offset: pageSize * (current - 1),
                }),
                models_1.Subject.count({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: "%" + name + "%",
                        },
                    },
                }),
            ]);
            return [subjects, totalRows];
        });
    }
    getSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield models_1.Subject.findOne({
                where: {
                    id: id,
                },
            });
            return subject;
        });
    }
    updateSubjectById(id, subjectInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Subject.update({
                name: subjectInfo.name,
                tinchi_number: subjectInfo.tinchi_number,
            }, {
                where: {
                    id,
                },
            });
            return result;
        });
    }
}
exports.subjectRepository = new SubjectRepository();
