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
exports.sessionService = exports.SessionService = void 0;
const logger_1 = require("../../logger");
const session_repository_1 = require("./session.repository");
class SessionService {
    constructor() {
        this.logger = logger_1.Logger.getInstance(module);
    }
    //Get Session Info
    getSessionInfo(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                return session_repository_1.sessionRepository.getSessionByQuery(query);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Get all session
    getAllSession(pageSize, current, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                const [sessions, totalRows] = yield session_repository_1.sessionRepository.getAllSession(pageSize, current, date);
                return { sessions, totalRows };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Create Session account
    createNewSession(SessionInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return session_repository_1.sessionRepository.findOrCreateSession(SessionInfo);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.SessionService = SessionService;
exports.sessionService = new SessionService();
