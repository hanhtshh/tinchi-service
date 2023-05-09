import Joi from "joi";
const getSubjectInforValidation = async (args: any) =>
  Joi.object({
    id: Joi.number().optional(),
  }).validateAsync(args, { stripUnknown: true });

const createSubjectValidation = async (args: any) =>
  Joi.object({
    name: Joi.string().required(),
    tinchi_number: Joi.number().required().min(0),
  }).validateAsync(args, { stripUnknown: true });

const updateSubjectValidation = async (args: any) =>
  Joi.object({
    name: Joi.string().required(),
    tinchi_number: Joi.number().required().min(0),
    id: Joi.number().required(),
  }).validateAsync(args, { stripUnknown: true });

const getAllSubjectValidation = async (args: any) =>
  Joi.object({
    pageSize: Joi.number().optional(),
    current: Joi.number().optional(),
    name: Joi.string().optional().allow(""),
  }).validateAsync(args, { stripUnknown: true });

const subjectValidation = {
  getSubjectInforValidation,
  createSubjectValidation,
  getAllSubjectValidation,
  updateSubjectValidation,
};

export default subjectValidation;
