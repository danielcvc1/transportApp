import Joi from "joi"

export const createUserValidator = Joi.object({
  firstName: Joi.string().min(1).max(20).required(),
  lastName: Joi.string().min(1).max(20).required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net","io"] } })
    .required(),
  password: Joi.string().min(8).max(25).required(),
  verified: Joi.string(),
  admin: Joi.boolean(),
  verifiedBoolean:Joi.boolean(),
});



