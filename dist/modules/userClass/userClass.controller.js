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
const userClass_validation_1 = __importDefault(require("./userClass.validation"));
class UserClassController extends rest_controller_1.AbstractController {
    constructor(userService) {
        super(`/${constants_1.SERVICE_NAME}`);
        this.createUserClass = (request) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, request.body);
            const vArgs = yield this.validation(args, userClass_validation_1.default.createUserClassValidation);
            const { user_id, class_id } = vArgs;
            const response = yield this.userService.createUserClass(user_id, class_id);
            return response;
        });
        this.userService = userService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/user-class/create`, 
        // authorizeMiddleware.adminSource,
        this.asyncRouteFormatResponse(this.createUserClass));
    }
}
exports.default = UserClassController;
