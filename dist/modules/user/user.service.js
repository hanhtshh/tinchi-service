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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_1 = require("../../common/http");
const config_1 = __importDefault(require("../../config"));
const logger_1 = require("../../logger");
const class_repository_1 = require("../class/class.repository");
const userClass_repository_1 = require("../userClass/userClass.repository");
const user_repository_1 = require("./user.repository");
const sequelize_1 = require("sequelize");
const subject_repository_1 = require("../subject/subject.repository");
const models_1 = require("../../models");
const session_repository_1 = require("../session/session.repository");
const class_service_1 = require("../class/class.service");
class UserService {
    constructor() {
        this.logger = logger_1.Logger.getInstance(module);
    }
    //Get User Info
    getUserInfo(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info("ok");
                return user_repository_1.userRepository.getUserByQuery(query);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Create User account
    createUserAccount(userInfo, listClassId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = config_1.default.auth_secret;
                const encryptedPassword = crypto_js_1.default.AES.encrypt(userInfo.password, secret).toString();
                const newUser = yield user_repository_1.userRepository.findOrCreateUser(Object.assign(Object.assign({}, userInfo), { password: encryptedPassword }));
                yield class_service_1.classService.addClass(listClassId, newUser[0].id);
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //update user acount
    updateUserAccount(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = config_1.default.auth_secret;
                const encryptedPassword = crypto_js_1.default.AES.encrypt(userInfo.password, secret).toString();
                const newUser = yield user_repository_1.userRepository.updateUserInfo(Object.assign(Object.assign({}, userInfo), { password: encryptedPassword }), {
                    id: userInfo.id,
                });
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Register
    registerUser(email, password, name, phone_number, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (secret === config_1.default.admin_secret) {
                    console.log(secret);
                    const encryptedPassword = crypto_js_1.default.AES.encrypt(password, config_1.default.auth_secret).toString();
                    console.log(encryptedPassword);
                    const newAdmin = yield user_repository_1.userRepository.findOrCreateUser({
                        email,
                        password: encryptedPassword,
                        name,
                        phone_number,
                        role: 2,
                    });
                    return newAdmin;
                }
                throw new http_1.HttpError(400, "Invalid secret", "Mã bí mật không đúng, vui lòng kiểm tra lại!");
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Login
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = config_1.default.auth_secret;
                const userInfo = yield user_repository_1.userRepository.getUserByQuery({ email });
                if (userInfo) {
                    const comparePassword = crypto_js_1.default.AES.decrypt(userInfo.password, secret).toString(crypto_js_1.default.enc.Utf8);
                    if (password === comparePassword) {
                        const token = jsonwebtoken_1.default.sign({
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            phone_number: userInfo.phone_number,
                            role: userInfo.role,
                        }, config_1.default.token_secret, {
                            expiresIn: "1 days",
                        });
                        return {
                            token,
                            userInfo: {
                                id: userInfo.id,
                                name: userInfo.name,
                                email: userInfo.email,
                                phone_number: userInfo.phone_number,
                                role: userInfo.role,
                            },
                        };
                    }
                }
                throw new http_1.HttpError(400, "Invalid acount", "Sai thông tin đăng nhập, vui lòng kiểm tra lại");
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Get all students
    getAllStudent(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [listStudent, totalRows] = yield user_repository_1.userRepository.getAllUserByRole({
                    role: 0,
                    name: {
                        [sequelize_1.Op.like]: "%" + name + "%",
                    },
                }, pageSize, current);
                return {
                    listStudent: {
                        students: listStudent.map((user) => (Object.assign(Object.assign({}, user.dataValues), { password: crypto_js_1.default.AES.decrypt(user.dataValues.password, config_1.default.auth_secret).toString(crypto_js_1.default.enc.Utf8) }))),
                        totalRows,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Get all students
    getAllTeacher(pageSize, current, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [listTeacher, totalRows] = yield user_repository_1.userRepository.getAllUserByRole({
                    role: 1,
                    name: {
                        [sequelize_1.Op.like]: "%" + name + "%",
                    },
                }, pageSize, current);
                return {
                    teachers: listTeacher.map((user) => (Object.assign(Object.assign({}, user.dataValues), { password: crypto_js_1.default.AES.decrypt(user.dataValues.password, config_1.default.auth_secret).toString(crypto_js_1.default.enc.Utf8) }))),
                    totalRows,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Get all students
    getStudentDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentDetail = yield user_repository_1.userRepository.getUserDetail({
                    id,
                });
                if (studentDetail) {
                    const listUserClass = yield userClass_repository_1.userClassRepository.getAllUserClassByUserId({
                        user_id: id,
                    });
                    console.log(listUserClass);
                    const listClass = yield Promise.all(listUserClass.map((userClass) => __awaiter(this, void 0, void 0, function* () {
                        const classDetail = yield class_repository_1.classRepository.getClassById(userClass.class_id);
                        let subjectDetail;
                        let sessionList;
                        if (classDetail) {
                            subjectDetail = yield subject_repository_1.subjectRepository.getSubjectById(classDetail === null || classDetail === void 0 ? void 0 : classDetail.subject_id);
                            const classSessionList = yield models_1.ClassSession.findAll({
                                where: {
                                    class_id: classDetail === null || classDetail === void 0 ? void 0 : classDetail.id,
                                },
                                raw: true,
                            });
                            sessionList = yield Promise.all(classSessionList === null || classSessionList === void 0 ? void 0 : classSessionList.map((classSession) => session_repository_1.sessionRepository.getSessionByQuery({
                                id: classSession.session_id,
                            })));
                        }
                        return Object.assign(Object.assign({}, classDetail), { subject: subjectDetail, sessionList });
                    })));
                    return Object.assign(Object.assign({}, studentDetail.dataValues), { password: crypto_js_1.default.AES.decrypt(studentDetail.dataValues.password, config_1.default.auth_secret).toString(crypto_js_1.default.enc.Utf8), listClass });
                }
                else {
                    throw new http_1.HttpError(404, "Không tìm thấy thông tin", "Không tìm thấy thông tin");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
