const express = require("express");
const addPaymentValidation = require("../validations/addPayment.validation");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const paymentController = require("../controllers/payment.controller");
const validatorHelper = require("../helpers/validator.helper");
const expressAsyncHandler = require("express-async-handler");
const paymentStatusValidation = require("../validations/paymentStatus.validation");

const routes = express.Router();

routes
    // Add
    .post(
        "/",
        validatorHelper.body(addPaymentValidation),
        authenticationMiddleware,
        expressAsyncHandler(paymentController.add)
    )

    // failed/success payment status
    .post(
        "/update-status",
        validatorHelper.body(paymentStatusValidation),
        authenticationMiddleware,
        expressAsyncHandler(paymentController.paymentStatus)
    );

module.exports = routes;
