const Joi = require("joi");

module.exports = Joi.object({
    productId: Joi.number().required().messages({
        "string.empty": "The product id field is required.",
    }),
    invoiceId: Joi.string().required().messages({
        "string.empty": "The tax id field is required.",
    }),
    txnId: Joi.string().required().messages({
        "string.empty": "The tax id field is required.",
    }),
    paidAmount: Joi.number().required().messages({
        "string.empty": "The paid amount field is required.",
    }),
});
