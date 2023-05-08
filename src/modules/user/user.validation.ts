import Joi from "joi";

const getUserInforValidation = async (args: any) =>
  Joi.object({
    email: Joi.string()
      .optional()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phone_number: Joi.string()
      .optional()
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
  }).validateAsync(args, { stripUnknown: true });

const createUserValidation = async (args: any) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: Joi.string().required().min(6).max(255),
    phone_number: Joi.string()
      .required()
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    role: Joi.number().valid(0, 1, 2),
    id: Joi.number().optional(),
    listClassId: Joi.array().items(Joi.number()).optional(),
  }).validateAsync(args, { stripUnknown: true });

const loginUserValidation = async (args: any) =>
  Joi.object({
    email: Joi.string()
      .required()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: Joi.string().min(6).required(),
  }).validateAsync(args, { stripUnknown: true });

const registerUserValidation = async (args: any) =>
  Joi.object({
    email: Joi.string()
      .required()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phone_number: Joi.string()
      .optional()
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: Joi.string().min(6).required(),
    name: Joi.string().required().max(255),
    secret: Joi.string().required(),
  }).validateAsync(args, { stripUnknown: true });

const getAllStudentValidation = async (args: any) =>
  Joi.object({
    pageSize: Joi.number().optional(),
    current: Joi.required().optional(),
    name: Joi.string().optional().allow(""),
  }).validateAsync(args, { stripUnknown: true });

const getStudentDetailValidation = async (args: any) =>
  Joi.object({
    id: Joi.number().required(),
  }).validateAsync(args, { stripUnknown: true });

const userValidation = {
  getUserInforValidation,
  createUserValidation,
  loginUserValidation,
  registerUserValidation,
  getAllStudentValidation,
  getStudentDetailValidation,
};

export default userValidation;
