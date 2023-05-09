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
const joi_1 = __importDefault(require("joi"));
const getSubjectInforValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        id: joi_1.default.number().optional(),
    }).validateAsync(args, { stripUnknown: true });
});
const createSubjectValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        tinchi_number: joi_1.default.number().required().min(0),
    }).validateAsync(args, { stripUnknown: true });
});
const updateSubjectValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        tinchi_number: joi_1.default.number().required().min(0),
        id: joi_1.default.number().required(),
    }).validateAsync(args, { stripUnknown: true });
});
const getAllSubjectValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        pageSize: joi_1.default.number().optional(),
        current: joi_1.default.number().optional(),
        name: joi_1.default.string().optional().allow(""),
    }).validateAsync(args, { stripUnknown: true });
});
const subjectValidation = {
    getSubjectInforValidation,
    createSubjectValidation,
    getAllSubjectValidation,
    updateSubjectValidation,
};
exports.default = subjectValidation;
