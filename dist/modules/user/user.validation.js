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
const getUserInforValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        email: joi_1.default.string()
            .optional()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        phone_number: joi_1.default.string()
            .optional()
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    }).validateAsync(args, { stripUnknown: true });
});
const createUserValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string()
            .required()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        password: joi_1.default.string().required().min(6).max(255),
        phone_number: joi_1.default.string()
            .required()
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
        role: joi_1.default.number().valid(0, 1, 2),
        id: joi_1.default.number().optional(),
        listClassId: joi_1.default.array().items(joi_1.default.number()).optional(),
    }).validateAsync(args, { stripUnknown: true });
});
const loginUserValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        email: joi_1.default.string()
            .required()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        password: joi_1.default.string().min(6).required(),
    }).validateAsync(args, { stripUnknown: true });
});
const registerUserValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        email: joi_1.default.string()
            .required()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        phone_number: joi_1.default.string()
            .optional()
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
        password: joi_1.default.string().min(6).required(),
        name: joi_1.default.string().required().max(255),
        secret: joi_1.default.string().required(),
    }).validateAsync(args, { stripUnknown: true });
});
const getAllStudentValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        pageSize: joi_1.default.number().optional(),
        current: joi_1.default.required().optional(),
        name: joi_1.default.string().optional().allow(""),
    }).validateAsync(args, { stripUnknown: true });
});
const getStudentDetailValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        id: joi_1.default.number().required(),
    }).validateAsync(args, { stripUnknown: true });
});
const userValidation = {
    getUserInforValidation,
    createUserValidation,
    loginUserValidation,
    registerUserValidation,
    getAllStudentValidation,
    getStudentDetailValidation,
};
exports.default = userValidation;
