const express = require("express");
const productController = require("../controllers/product.controller");
const validatorHelper = require("../helpers/validator.helper");
const addProductValidation = require("../validations/addProduct.validation");
const updateProductValidation = require("../validations/updateProduct.validation");
const expressAsyncHandler = require("express-async-handler");

const routes = express.Router();

routes
    // Add
    .post(
        "/",
        validatorHelper.body(addProductValidation),
        expressAsyncHandler(productController.add)
    )

    // update
    .put(
        "/:productId",
        validatorHelper.body(updateProductValidation),
        expressAsyncHandler(productController.update)
    )

    // delete
    .delete("/:productId", expressAsyncHandler(productController.delete))

    // List
    .get("/", expressAsyncHandler(productController.list));

module.exports = routes;
