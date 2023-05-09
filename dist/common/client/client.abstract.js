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
exports.ClientAbstract = void 0;
const logger_1 = require("../../logger");
const http_1 = require("../http");
const htttp_enums_1 = require("../http/htttp.enums");
const logger = logger_1.Logger.getInstance(module);
class ClientAbstract {
    constructor(baseURL, headers) {
        this.baseURL = baseURL;
        this.headers = headers;
        this.httpClient = (0, http_1.createHttpClient)({
            baseURL,
            headers,
        });
    }
    request({ apiPath, method, headers, payload, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            logger.debug(`payload >>: ${JSON.stringify(payload)}`);
            try {
                const config = {
                    headers: Object.assign(Object.assign({}, this.headers), headers),
                    params,
                };
                switch (method) {
                    case htttp_enums_1.Method.GET: {
                        response = this.httpClient.get(apiPath, config);
                        break;
                    }
                    case htttp_enums_1.Method.POST: {
                        response = this.httpClient.post(apiPath, payload, config);
                        break;
                    }
                    case htttp_enums_1.Method.PUT: {
                        response = this.httpClient.put(apiPath, payload, config);
                        break;
                    }
                    case htttp_enums_1.Method.PATCH: {
                        response = this.httpClient.patch(apiPath, payload, config);
                        break;
                    }
                    case htttp_enums_1.Method.DELETE: {
                        response = this.httpClient.delete(apiPath, config);
                        break;
                    }
                    default: {
                        throw new Error("Method wrong!");
                    }
                }
                return response;
            }
            catch (error) {
                logger.error(`Request have been failed in url: ${this.baseURL}/${apiPath}: ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
}
exports.ClientAbstract = ClientAbstract;
