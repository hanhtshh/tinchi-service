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
const constants_1 = require("../../common/constants");
const res_util_1 = require("../../common/rest/res.util");
const rest_controller_1 = require("../../common/rest/rest.controller");
class HealthController extends rest_controller_1.AbstractController {
    constructor() {
        super(`/${constants_1.SERVICE_NAME}`);
        this.initializeRoutes = () => {
            this.router.get(`${this.path}/health-check`, this.healthResponse);
            this.router.get(`${this.path}/ping`, this.ping);
        };
        this.healthResponse = (req, response, _next) => __awaiter(this, void 0, void 0, function* () {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const data = { message: 'Tinchi Service is UP and Running', ip };
            return (0, res_util_1.sendSuccess)(req, response)({ data });
        });
        this.ping = (_request, res, _next) => res.send('pong!');
        this.initializeRoutes();
    }
}
exports.default = HealthController;
