const Joi = require("joi");

module.exports = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "The email field is required.",
    }),
    password: Joi.string().required().messages({
        "string.empty": "The password field is required.",
    }),
});
