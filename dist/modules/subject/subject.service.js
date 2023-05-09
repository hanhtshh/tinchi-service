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
exports.subjectService = exports.SubjectService = void 0;
const logger_1 = require("../../logger");
const subject_repository_1 = require("./subject.repository");
class SubjectService {
    constructor() {
        this.logger = logger_1.Logger.getInstance(module);
    }
    //Get class Info
    getSubjectInfo(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                return subject_repository_1.subjectRepository.getSubjectByQuery(query);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllSubject(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                const [subjects, totalRows] = yield subject_repository_1.subjectRepository.getAllSubject(pageSize, current, name);
                return {
                    subjects,
                    totalRows,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Create class account
    createNewSubject(classInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return subject_repository_1.subjectRepository.findOrCreateSubject(classInfo);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //update subject
    updateSubject(id, subjectInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return subject_repository_1.subjectRepository.updateSubjectById(id, subjectInfo);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.SubjectService = SubjectService;
exports.subjectService = new SubjectService();
