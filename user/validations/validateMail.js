import Joi from "joi"


export const validateActivation = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io"] } })
        .required(),
    activateAccount: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io"] } })
        .required(),
    password: Joi.string().min(8).max(25).required(),
  

}
)