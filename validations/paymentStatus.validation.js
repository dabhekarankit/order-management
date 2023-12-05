const Joi = require("joi");
const { PAYMENT_STATUS } = require("../helpers/constant.helper");

module.exports = Joi.object({
    paymentId: Joi.number().required().messages({
        "string.empty": "The product id field is required.",
    }),
    paymentStatus: Joi.string()
        .valid(...Object.values(PAYMENT_STATUS))
        .required(),
});
