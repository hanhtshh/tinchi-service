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
exports.classService = exports.ClassService = void 0;
const http_1 = require("../../common/http");
const logger_1 = require("../../logger");
const models_1 = require("../../models");
const session_repository_1 = require("../session/session.repository");
const user_repository_1 = require("../user/user.repository");
const userClass_repository_1 = require("../userClass/userClass.repository");
const class_repository_1 = require("./class.repository");
class ClassService {
    constructor() {
        this.logger = logger_1.Logger.getInstance(module);
    }
    //Get class Info
    getClassInfo(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                const classDetail = yield class_repository_1.classRepository.getClassByQuery(query);
                const listUserClass = yield userClass_repository_1.userClassRepository.getAllUserClassByUserId({
                    class_id: classDetail === null || classDetail === void 0 ? void 0 : classDetail.id,
                });
                const listUserInfo = yield Promise.all(listUserClass === null || listUserClass === void 0 ? void 0 : listUserClass.map((userClass) => user_repository_1.userRepository.getUserByQuery({
                    id: userClass.user_id,
                })));
                let sessionList;
                const classSessionList = yield models_1.ClassSession.findAll({
                    where: {
                        class_id: classDetail === null || classDetail === void 0 ? void 0 : classDetail.id,
                    },
                    raw: true,
                });
                sessionList = yield Promise.all(classSessionList === null || classSessionList === void 0 ? void 0 : classSessionList.map((classSession) => session_repository_1.sessionRepository.getSessionByQuery({
                    id: classSession.session_id,
                })));
                return Object.assign(Object.assign({}, classDetail), { listUserInfo,
                    sessionList });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllClass(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                const [classes, totalRows] = yield class_repository_1.classRepository.getAllClass(pageSize, current, name);
                return {
                    classes,
                    totalRows,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Create class account
    createNewClass(classInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classResult = yield class_repository_1.classRepository.findOrCreateClass(classInfo);
                const sessionSet = new Set(classInfo.listSessionId);
                if (sessionSet.size !== classInfo.listSessionId.length) {
                    throw new http_1.HttpError(400, "Kíp học bị trùng, vui lòng kiểm tra lại", "Kíp học bị trùng, vui lòng kiểm tra lại");
                }
                yield models_1.ClassSession.bulkCreate(classInfo.listSessionId.map((sessionId) => ({
                    session_id: sessionId,
                    class_id: classResult.id,
                })));
                return classResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //update class account
    updateClass(classInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classResult = yield class_repository_1.classRepository.updateClass(classInfo, classInfo.id);
                const sessionSet = new Set(classInfo.listSessionId);
                if (sessionSet.size !== classInfo.listSessionId.length) {
                    throw new http_1.HttpError(400, "Kíp học bị trùng, vui lòng kiểm tra lại", "Kíp học bị trùng, vui lòng kiểm tra lại");
                }
                if (classResult[0]) {
                    yield models_1.ClassSession.destroy({
                        where: {
                            class_id: classInfo.id,
                        },
                    });
                    yield models_1.ClassSession.bulkCreate(classInfo.listSessionId.map((sessionId) => ({
                        session_id: sessionId,
                        class_id: classInfo.id,
                    })));
                }
                return classResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Check duplicate schedule
    checkSchedule(listClassId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(listClassId);
                const listClass = yield Promise.all(listClassId.map((class_id) => class_repository_1.classRepository.getClassById(class_id)));
                const listSubjectId = listClass.map((classDetail) => classDetail === null || classDetail === void 0 ? void 0 : classDetail.subject_id);
                if (new Set(listSubjectId).size !== listSubjectId.length) {
                    return false;
                }
                const listSessionArray = yield Promise.all(listClassId.map((class_id) => models_1.ClassSession.findAll({
                    where: {
                        class_id: class_id,
                    },
                })));
                let listSessionId = [];
                listSessionArray.forEach((listSubSessionClass) => {
                    listSessionId = listSessionId.concat(listSubSessionClass.map((sessionClass) => sessionClass.session_id));
                });
                const listSessionIdSet = new Set(listSessionId);
                if (listSessionIdSet.size == listSessionId.length) {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Add class
    addClass(listClassId, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkScheduleResult = yield this.checkSchedule(listClassId);
                if (checkScheduleResult) {
                    yield userClass_repository_1.userClassRepository.deleteAllClass({
                        user_id: user_id,
                    });
                    yield Promise.all(listClassId.map((class_id) => userClass_repository_1.userClassRepository.createUserClass({
                        user_id: user_id,
                        class_id: class_id,
                    })));
                    return true;
                }
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ClassService = ClassService;
exports.classService = new ClassService();
