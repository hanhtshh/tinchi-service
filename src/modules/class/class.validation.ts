import Joi from "joi";
const getClassInforValidation = async (args: any) =>
  Joi.object({
    id: Joi.number().optional(),
  }).validateAsync(args, { stripUnknown: true });

const createClassValidation = async (args: any) =>
  Joi.object({
    subject_id: Joi.number().required().min(0),
    max_student: Joi.number().required().min(0),
    group: Joi.number().required().min(0),
    listSessionId: Joi.array().items(Joi.number()),
  }).validateAsync(args, { stripUnknown: true });

const getAllClassValidation = async (args: any) =>
  Joi.object({
    pageSize: Joi.number().optional(),
    current: Joi.number().optional(),
    name: Joi.string().optional().allow(""),
  }).validateAsync(args, { stripUnknown: true });

const checkScheduleValidation = async (args: any) =>
  Joi.object({
    listClassId: Joi.array().items(Joi.number()),
  }).validateAsync(args, { stripUnknown: true });

const classValidation = {
  getClassInforValidation,
  createClassValidation,
  getAllClassValidation,
  checkScheduleValidation,
};

export default classValidation;
