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
exports.userClassRepository = void 0;
const models_1 = require("../../models");
class UserClassRepository {
    createUserClass(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.findOrCreate({
                where: condition,
            });
            return result;
        });
    }
    findOrCreateUser(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.findOrCreate({
                where: condition,
            });
            return result;
        });
    }
    getUserByQuery(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.findOne({
                where: condition,
            });
            return result;
        });
    }
    getAllUserClassByUserId(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.findAll({
                where: condition,
            });
            return result;
        });
    }
    getUserDetail(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.findOne({
                where: condition,
            });
            return result;
        });
    }
    deleteAllClass(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.UserClass.destroy({
                where: condition,
            });
            return result;
        });
    }
}
exports.userClassRepository = new UserClassRepository();
