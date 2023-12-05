const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "The name field is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "The email field is required.",
    }),
    mobile: Joi.string().required().messages({
        "string.empty": "The mobile field is required.",
    }),
});
