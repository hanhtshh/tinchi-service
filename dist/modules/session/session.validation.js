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
const getSessionInforValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        email: joi_1.default.string()
            .optional()
            .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        phone_number: joi_1.default.string()
            .optional()
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    }).validateAsync(args, { stripUnknown: true });
});
const getAllSessionValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        pageSize: joi_1.default.number().optional().min(0),
        current: joi_1.default.number().optional().min(0),
        date: joi_1.default.string().optional(),
    }).validateAsync(args, { stripUnknown: true });
});
const createSessionValidation = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return joi_1.default.object({
        date: joi_1.default.date().required(),
        start_time: joi_1.default.number().required().min(0),
        total_time: joi_1.default.number().required().min(0),
        id: joi_1.default.number().optional(),
    }).validateAsync(args, { stripUnknown: true });
});
const sessionValidation = {
    getSessionInforValidation,
    createSessionValidation,
    getAllSessionValidation,
};
exports.default = sessionValidation;
