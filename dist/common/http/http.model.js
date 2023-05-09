"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, error, message) {
        super();
        this.status = status;
        this.error = error;
        // hapi Boom needs message field
        this.message = message || "HttpError";
    }
}
exports.HttpError = HttpError;
