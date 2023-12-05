const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "The email field is required.",
    }),
    originalAmount: Joi.number().required().messages({
        "string.empty": "The original amount field is required.",
    }),
    discountedAmount: Joi.number().required().messages({
        "string.empty": "The discounted amount field is required.",
    }),
});
