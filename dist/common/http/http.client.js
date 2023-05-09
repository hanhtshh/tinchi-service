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
exports.AxiosHttpClient = exports.generateAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = require("qs");
const http_model_1 = require("./http.model");
const http_constant_1 = require("./http.constant");
const htttp_enums_1 = require("./htttp.enums");
const paramsSerializer = (params) => (0, qs_1.stringify)(params, {
    arrayFormat: "repeat",
});
function generateAxiosInstance(apiConfig) {
    return axios_1.default.create(Object.assign({ paramsSerializer }, apiConfig));
}
exports.generateAxiosInstance = generateAxiosInstance;
class AxiosHttpClient {
    constructor(apiConfig) {
        this.apiConfig = apiConfig;
        this.apiConfig.timeout = this.apiConfig.timeout || http_constant_1.defaultTimeout;
        this.axiosInstance = generateAxiosInstance(this.apiConfig);
    }
    mergeConfig(apiConfig) {
        return Object.assign(Object.assign(Object.assign({}, this.apiConfig), apiConfig), { headers: Object.assign({}, apiConfig.headers) });
    }
    setRequestInterceptor(fn) {
        this.axiosInstance.interceptors.request.use(fn);
    }
    request(config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mergedConfig = this.mergeConfig(config);
                const res = yield this.axiosInstance.request(mergedConfig);
                return res;
            }
            catch (error) {
                // should handle error globally if the caller don't pass an error handler
                if (error && error.response) {
                    throw new http_model_1.HttpError((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status, (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data);
                }
                // client error, such as timeout
                throw error;
            }
        });
    }
    get(url, config) {
        const defaultConfig = {
            url,
            method: htttp_enums_1.Method.GET,
        };
        return this.request(Object.assign(Object.assign({}, defaultConfig), config));
    }
    delete(url, config) {
        const defaultConfig = {
            url,
            method: htttp_enums_1.Method.DELETE,
        };
        return this.request(Object.assign(Object.assign({}, defaultConfig), config));
    }
    post(url, data, config) {
        const defaultConfig = {
            url,
            data,
            method: htttp_enums_1.Method.POST,
        };
        return this.request(Object.assign(Object.assign({}, defaultConfig), config));
    }
    put(url, data, config) {
        const defaultConfig = {
            url,
            data,
            method: htttp_enums_1.Method.PUT,
        };
        return this.request(Object.assign(Object.assign({}, defaultConfig), config));
    }
    patch(url, data, config) {
        const defaultConfig = {
            url,
            data,
            method: htttp_enums_1.Method.PATCH,
        };
        return this.request(Object.assign(Object.assign({}, defaultConfig), config));
    }
}
exports.AxiosHttpClient = AxiosHttpClient;
