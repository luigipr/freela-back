import Joi from "joi";

export const serviceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    price:  Joi.number().precision(2).required(),
}).allow("id", "name", "email", "password", "confirmPassword")