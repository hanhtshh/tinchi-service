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
const class_validation_1 = __importDefault(require("./class.validation"));
class ClassController extends rest_controller_1.AbstractController {
    constructor(ClassService) {
        super(`/${constants_1.SERVICE_NAME}`);
        this.getClassInfo = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, class_validation_1.default.getClassInforValidation);
            const query = vArgs;
            const response = yield this.classService.getClassInfo(query);
            return response;
        });
        this.getAllClass = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, class_validation_1.default.getAllClassValidation);
            const { pageSize = 10, current = 1, name = "" } = vArgs;
            const response = yield this.classService.getAllClass(pageSize, current, name);
            return response;
        });
        this.createClass = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, class_validation_1.default.createClassValidation);
            const { subject_id, group, max_student, listSessionId } = vArgs;
            const response = yield this.classService.createNewClass({
                subject_id,
                group,
                max_student,
                listSessionId,
            });
            return response;
        });
        this.updateClass = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, class_validation_1.default.createClassValidation);
            const { subject_id, group, max_student, listSessionId, id } = vArgs;
            const response = yield this.classService.updateClass({
                subject_id,
                group,
                max_student,
                listSessionId,
                id,
            });
            return response;
        });
        this.checkSchedule = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, class_validation_1.default.checkScheduleValidation);
            const { listClassId } = vArgs;
            const response = yield this.classService.checkSchedule(listClassId);
            return response;
        });
        this.addClass = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, class_validation_1.default.checkScheduleValidation);
            const userInfo = request === null || request === void 0 ? void 0 : request.userInfo;
            const { listClassId } = vArgs;
            const response = yield this.classService.addClass(listClassId, userInfo === null || userInfo === void 0 ? void 0 : userInfo.id);
            return response;
        });
        this.addClassAdmin = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, class_validation_1.default.checkScheduleValidation);
            const { listClassId, userId } = vArgs;
            const response = yield this.classService.addClass(listClassId, userId);
            return response;
        });
        this.classService = ClassService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/class/get-class-info`, 
        // authorizeMiddleware.allSource,
        this.asyncRouteFormatResponse(this.getClassInfo));
        this.router.get(`${this.path}/class/get-all-class`, 
        // authorizeMiddleware.allSource,
        this.asyncRouteFormatResponse(this.getAllClass));
        this.router.post(`${this.path}/class/create`, this.asyncRouteFormatResponse(this.createClass));
        this.router.post(`${this.path}/class/check-schedule`, this.asyncRouteFormatResponse(this.checkSchedule));
        this.router.post(`${this.path}/class/add-class`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.addClass));
        this.router.post(`${this.path}/class/add-class-admin`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.addClassAdmin));
        this.router.put(`${this.path}/class/update`, this.asyncRouteFormatResponse(this.createClass));
    }
}
exports.default = ClassController;
