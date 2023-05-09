"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const createUploader = () => {
    const destinationPath = path_1.default.join(__dirname, "./temp-uploads", "/");
    return (0, multer_1.default)({
        dest: destinationPath,
    });
};
exports.createUploader = createUploader;
