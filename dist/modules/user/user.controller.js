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
const constants_1 = require("../../common/constants");
const rest_controller_1 = require("../../common/rest/rest.controller");
const authen_1 = __importDefault(require("../../middleware/authen"));
const user_validation_1 = __importDefault(require("./user.validation"));
class UserController extends rest_controller_1.AbstractController {
    constructor(userService) {
        super(`/${constants_1.SERVICE_NAME}`);
        this.getUserInfo = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, user_validation_1.default.getUserInforValidation);
            const query = vArgs;
            const response = yield this.userService.getUserInfo(query);
            return response;
        });
        this.createUser = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, user_validation_1.default.createUserValidation);
            const { name, email, phone_number, role, password, listClassId } = vArgs;
            console.log(listClassId);
            const response = yield this.userService.createUserAccount({
                name,
                email,
                password,
                phone_number,
                role,
            }, listClassId);
            return response;
        });
        this.updateUser = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, user_validation_1.default.createUserValidation);
            const { name, email, phone_number, role, password, id } = vArgs;
            console.log("dsf");
            const response = yield this.userService.updateUserAccount({
                name,
                email,
                password,
                phone_number,
                role,
                id,
            });
            return response;
        });
        this.loginUser = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, user_validation_1.default.loginUserValidation);
            const { email, password } = vArgs;
            const response = yield this.userService.loginUser(email, password);
            return response;
        });
        this.registerUser = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, user_validation_1.default.registerUserValidation);
            const { email, password, name, phone_number, secret } = vArgs;
            const response = yield this.userService.registerUser(email, password, name, phone_number, secret);
            return response;
        });
        this.getAllStudent = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, user_validation_1.default.getAllStudentValidation);
            const { pageSize = 10, current = 1, name = "" } = vArgs;
            const response = yield this.userService.getAllStudent(pageSize, current, name);
            return response;
        });
        this.getAllTeacher = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, user_validation_1.default.getAllStudentValidation);
            const { pageSize = 10, current = 1, name = "" } = vArgs;
            const response = yield this.userService.getAllTeacher(pageSize, current, name);
            return response;
        });
        this.getStudentDetail = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.params);
            const vArgs = yield this.validation(args, user_validation_1.default.getStudentDetailValidation);
            const { id } = vArgs;
            const response = yield this.userService.getStudentDetail(id);
            return response;
        });
        this.userService = userService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/user/get-user-info`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.getUserInfo));
        this.router.get(`${this.path}/users/get-all-student`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.getAllStudent));
        this.router.get(`${this.path}/users/get-user-detail/:id`, this.asyncRouteFormatResponse(this.getStudentDetail));
        this.router.get(`${this.path}/users/get-all-teacher`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.getAllTeacher));
        this.router.post(`${this.path}/users/create`, 
        // authorizeMiddleware.adminSource,
        this.asyncRouteFormatResponse(this.createUser));
        this.router.put(`${this.path}/users/update`, 
        // authorizeMiddleware.adminSource,
        this.asyncRouteFormatResponse(this.updateUser));
        this.router.post(`${this.path}/user/login`, this.asyncRouteFormatResponse(this.loginUser));
        this.router.post(`${this.path}/user/register`, this.asyncRouteFormatResponse(this.registerUser));
    }
}
exports.default = UserController;
