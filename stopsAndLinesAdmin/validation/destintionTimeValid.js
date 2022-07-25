import Joi from "joi"


export const changeDestinationTimeValid = Joi.object({
    newDestinationTime:Joi.string().regex(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/),
    stopId:Joi.number().min(1).required()

}
)

