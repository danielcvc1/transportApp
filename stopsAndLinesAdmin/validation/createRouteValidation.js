import Joi from "joi"


export const createRouteValidation = Joi.object({
    nameOfRoute: Joi.string().min(1).max(25).required(),
    stopsPassingBy: Joi.array().min(2).max(30).items(Joi.string().required(), Joi.string().required()),// array must contain at least two strings
    timeOfDeparture: Joi.array().items(Joi.string().regex(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/))


}
)

