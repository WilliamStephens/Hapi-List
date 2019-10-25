import Joi from "@hapi/joi";

export const badRequestErrorResponseSchema = Joi.object({
  error: Joi.string().required(),
  message: Joi.string().required(),
  statusCode: Joi.number().required()
}).label("Bad Request Error Response");
