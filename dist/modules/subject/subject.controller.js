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
const subject_validation_1 = __importDefault(require("./subject.validation"));
class SubjectController extends rest_controller_1.AbstractController {
    constructor(SubjectService) {
        super(`/${constants_1.SERVICE_NAME}`);
        this.getSubjectInfo = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, subject_validation_1.default.getSubjectInforValidation);
            const query = vArgs;
            const response = yield this.subjectService.getSubjectInfo(query);
            return response;
        });
        this.getAllSubject = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, subject_validation_1.default.getAllSubjectValidation);
            const { pageSize = 10, current = 1, name = "" } = vArgs;
            const response = yield this.subjectService.getAllSubject(pageSize, current, name);
            return response;
        });
        this.createSubject = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, subject_validation_1.default.createSubjectValidation);
            const { name, tinchi_number } = vArgs;
            const response = yield this.subjectService.createNewSubject({
                name,
                tinchi_number,
            });
            return response;
        });
        this.updateSubject = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign(Object.assign({}, request.body), request.params);
            const vArgs = yield this.validation(args, subject_validation_1.default.updateSubjectValidation);
            const { name, tinchi_number, id } = vArgs;
            const response = yield this.subjectService.updateSubject(id, {
                name,
                tinchi_number,
            });
            return response;
        });
        this.subjectService = SubjectService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/subject/get-subject-info`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.getSubjectInfo));
        this.router.get(`${this.path}/subject/get-all-subject`, 
        // authorizeMiddleware.allSource,
        this.asyncRouteFormatResponse(this.getAllSubject));
        this.router.post(`${this.path}/subject/create`, this.asyncRouteFormatResponse(this.createSubject));
        this.router.put(`${this.path}/subject/update/:id`, this.asyncRouteFormatResponse(this.updateSubject));
    }
}
exports.default = SubjectController;
