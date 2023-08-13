import Joi from "joi";

export const serviceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    price:  Joi.number().precision(2).required(),
    uf: Joi.string().required(),
    city: Joi.string().required(),
    userId: Joi.number().required(),
}).allow("id", "name", "description", "image", "price", "uf", "city", "userId")