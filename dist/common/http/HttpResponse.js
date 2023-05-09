"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBase = void 0;
const htttp_enums_1 = require("./htttp.enums");
class ResponseBase {
    constructor() {
        this.body = {};
        this.body.data = undefined;
        this.body.error = undefined;
        this.statusCode = htttp_enums_1.StatusCode.INTERNAL_SERVER_ERROR;
    }
    success(data, statusCode = htttp_enums_1.StatusCode.OK) {
        this.body.data = data;
        this.statusCode = statusCode;
    }
    fail(error, statusCode = htttp_enums_1.StatusCode.INTERNAL_SERVER_ERROR) {
        this.body.error = error;
        this.statusCode = statusCode;
    }
    getData() {
        return this.body.data;
    }
    getBody() {
        return this.body;
    }
    getError() {
        return this.body.error;
    }
    getStatusCode() {
        return this.statusCode;
    }
}
exports.ResponseBase = ResponseBase;
