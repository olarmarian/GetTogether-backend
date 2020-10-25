import Joi from '@hapi/joi';

export const RestaurantSchema = Joi.object({
  createdAt: Joi.date().required(),
  location: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  searchName: Joi.string().required(),
  specifics: Joi.array().required().items(Joi.string()),
  tags: Joi.array().required().items(Joi.string()),
  id: Joi.string(),
});
