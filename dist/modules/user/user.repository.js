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
exports.userRepository = void 0;
const models_1 = require("../../models");
class UserRepository {
    findOrCreateUser(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.User.findOrCreate({
                where: condition,
            });
            return result;
        });
    }
    getUserByQuery(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.User.findOne({
                where: condition,
            });
            return result;
        });
    }
    updateUserInfo(userInfo, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.User.update(Object.assign({}, userInfo), {
                where: condition,
            });
            return result;
        });
    }
    getAllUserByRole(condition, pageSize, current) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result, totalRows] = yield Promise.all([
                models_1.User.findAll({
                    where: condition,
                    offset: pageSize * (current - 1),
                }),
                models_1.User.count({
                    where: condition,
                }),
            ]);
            return [result, totalRows];
        });
    }
    getUserDetail(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.User.findOne({
                where: condition,
            });
            return result;
        });
    }
}
exports.userRepository = new UserRepository();
