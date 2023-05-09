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
const session_validation_1 = __importDefault(require("./session.validation"));
class SessionController extends rest_controller_1.AbstractController {
    constructor(sessionService) {
        super(`/${constants_1.SERVICE_NAME}`);
        this.getSessionInfo = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, session_validation_1.default.getSessionInforValidation);
            const query = vArgs;
            const response = yield this.sessionService.getSessionInfo(query);
            return response;
        });
        this.getAllsession = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.query);
            const vArgs = yield this.validation(args, session_validation_1.default.getAllSessionValidation);
            const { pageSize = 10, current = 1, date } = vArgs;
            const response = yield this.sessionService.getAllSession(pageSize, current, date);
            return response;
        });
        this.createSession = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, session_validation_1.default.createSessionValidation);
            const { date, start_time, total_time } = vArgs;
            const response = yield this.sessionService.createNewSession({
                date,
                start_time,
                total_time,
            });
            return response;
        });
        this.sessionService = sessionService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/session/get-session-info`, authen_1.default.allSource, this.asyncRouteFormatResponse(this.getSessionInfo));
        this.router.get(`${this.path}/session/get-all-session`, this.asyncRouteFormatResponse(this.getAllsession));
        this.router.post(`${this.path}/sessions/create`, this.asyncRouteFormatResponse(this.createSession));
    }
}
exports.default = SessionController;