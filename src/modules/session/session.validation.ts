import Joi from "joi";

const getSessionInforValidation = async (args: any) =>
  Joi.object({
    email: Joi.string()
      .optional()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phone_number: Joi.string()
      .optional()
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
  }).validateAsync(args, { stripUnknown: true });

const getAllSessionValidation = async (args: any) =>
  Joi.object({
    pageSize: Joi.number().optional().min(0),
    current: Joi.number().optional().min(0),
    date: Joi.string().optional(),
  }).validateAsync(args, { stripUnknown: true });

const createSessionValidation = async (args: any) =>
  Joi.object({
    date: Joi.date().required(),
    start_time: Joi.number().required().min(0),
    total_time: Joi.number().required().min(0),
  }).validateAsync(args, { stripUnknown: true });

const sessionValidation = {
  getSessionInforValidation,
  createSessionValidation,
  getAllSessionValidation,
};

export default sessionValidation;
