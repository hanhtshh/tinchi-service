import Joi from "joi";

const createUserClassValidation = async (args: any) =>
  Joi.object({
    user_id: Joi.number().required(),
    class_id: Joi.number().required(),
  }).validateAsync(args, { stripUnknown: true });

const userClassValidation = {
  createUserClassValidation,
};

export default userClassValidation;
