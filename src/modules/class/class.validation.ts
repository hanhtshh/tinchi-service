import Joi from "joi";
const getClassInforValidation = async (args: any) =>
  Joi.object({}).validateAsync(args, { stripUnknown: true });

const createClassValidation = async (args: any) =>
  Joi.object({
    name: Joi.string().required(),
    max_student: Joi.number().required().min(0),
    tinchi_number: Joi.number().required().min(0),
  }).validateAsync(args, { stripUnknown: true });

const getAllClassValidation = async (args: any) =>
  Joi.object({
    pageSize: Joi.number().optional(),
    current: Joi.number().optional(),
  }).validateAsync(args, { stripUnknown: true });

const classValidation = {
  getClassInforValidation,
  createClassValidation,
  getAllClassValidation,
};

export default classValidation;
