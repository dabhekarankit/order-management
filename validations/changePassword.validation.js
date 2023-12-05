const Joi = require("joi");

module.exports = Joi.object({
    oldPassword: Joi.string().required().messages({
        "string.empty": "The old password field is required.",
    }),
    password: Joi.string().required().messages({
        "string.empty": "The password field is required.",
    }),
});
