"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpClient = exports.HttpError = void 0;
const http_model_1 = require("./http.model");
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return http_model_1.HttpError; } });
const htttp_enums_1 = require("./htttp.enums");
const HttpResponse_1 = require("./HttpResponse");
const http_client_1 = require("./http.client");
const createHttpClient = (config) => new http_client_1.AxiosHttpClient(config);
exports.createHttpClient = createHttpClient;
exports.default = {
    Method: htttp_enums_1.Method,
    StatusCode: htttp_enums_1.StatusCode,
    ResponseBase: HttpResponse_1.ResponseBase,
};
