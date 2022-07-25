import Joi from "joi"


export const routeNameValid = Joi.object({
    oldName: Joi.string().min(1).max(25).required(),
    newName: Joi.string().min(1).max(25).required(),

    
}
)

