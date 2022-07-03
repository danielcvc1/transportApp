import Joi from "joi"


export const createStopValidation = Joi.object({
    nameOfStop: Joi.string().min(1).max(25).required(),
    adress: Joi.string().min(1).max(25).required(),
    typeOfStop: Joi.string().min(1).max(10).required(),


}
)