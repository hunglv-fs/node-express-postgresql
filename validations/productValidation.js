const Joi = require('joi');
const loadLanguage = require('../utils/i18n');

// validate
const validateProduct = (data, lang = 'vi') => {
  const messages = loadLanguage(lang).validation;

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.base': messages.string.base,
        'string.empty': messages.string.empty,
        'string.min': messages.string.min,
        'string.max': messages.string.max,
        'any.required': messages.any.required,
      }),

    price: Joi.number()
      .positive()
      .required()
      .messages({
        'number.base': messages.number.base,
        'number.positive': messages.number.positive,
        'any.required': messages.any.required,
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = validateProduct;
