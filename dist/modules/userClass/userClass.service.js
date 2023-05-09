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
exports.userClassService = exports.UserClassService = void 0;
const logger_1 = require("../../logger");
const userClass_repository_1 = require("../userClass/userClass.repository");
class UserClassService {
    constructor() {
        this.logger = logger_1.Logger.getInstance(module);
    }
    //Get User Info
    getUserInfo(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                return userClass_repository_1.userClassRepository.getUserByQuery(query);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Get User Info
    createUserClass(user_id, class_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userClass_repository_1.userClassRepository.createUserClass({
                    user_id,
                    class_id,
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserClassService = UserClassService;
exports.userClassService = new UserClassService();
