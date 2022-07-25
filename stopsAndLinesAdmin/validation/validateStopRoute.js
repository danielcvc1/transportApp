import Joi from "joi"


export const validateStopRoute = Joi.object({
    oldStopId: Joi.number().min(1).required(),
    newStopId: Joi.number().min(1).required(),
    newTimeOfArrival: Joi.string().regex(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/),


}
)