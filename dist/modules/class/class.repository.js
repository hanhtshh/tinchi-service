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
exports.classRepository = void 0;
const models_1 = require("../../models");
const subject_repository_1 = require("../subject/subject.repository");
class ClassRepository {
    findOrCreateClass(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Class.create(condition);
            return result;
        });
    }
    updateClass(condition, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Class.update(Object.assign({}, condition), {
                where: {
                    id,
                },
            });
            return result;
        });
    }
    getClassByQuery(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Class.findOne({
                where: condition,
                raw: true,
            });
            return result;
        });
    }
    getAllClass(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [classes, total] = yield Promise.all([
                models_1.Class.findAll({
                    limit: pageSize,
                    offset: pageSize * (current - 1),
                }),
                models_1.Class.count(),
            ]);
            const classesFormat = yield Promise.all(classes.map((classDetail) => __awaiter(this, void 0, void 0, function* () {
                const subject = yield subject_repository_1.subjectRepository.getSubjectById(classDetail.dataValues.subject_id);
                if (subject === null || subject === void 0 ? void 0 : subject.name.toUpperCase().includes(name.toUpperCase())) {
                    return Object.assign(Object.assign({}, classDetail.dataValues), { subject });
                }
                return null;
            })));
            return [classesFormat.filter((class_check) => class_check != null), total];
        });
    }
    getClassById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = yield models_1.Class.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            return userClass;
        });
    }
}
exports.classRepository = new ClassRepository();
