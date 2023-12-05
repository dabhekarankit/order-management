const express = require("express");
const validatorHelper = require("../helpers/validator.helper");
const userRegisterValidation = require("../validations/userRegister.validation");
const expressAsyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const userLoginValidation = require("../validations/userLogin.validation");
const userUpdateValidation = require("../validations/userUpdate.validation");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const changePasswordValidation = require("../validations/changePassword.validation");
const routes = express.Router();

routes
    // Register
    .post(
        "/register",
        validatorHelper.body(userRegisterValidation),
        expressAsyncHandler(userController.register)
    )

    // Login
    .post(
        "/login",
        validatorHelper.body(userLoginValidation),
        expressAsyncHandler(userController.login)
    )

    // List
    .get("/", expressAsyncHandler(userController.list))

    // Detail by id
    .get("/:userId", expressAsyncHandler(userController.detail))

    // Update by id
    .put(
        "/:userId",
        validatorHelper.body(userUpdateValidation),
        authenticationMiddleware,
        expressAsyncHandler(userController.update)
    )

    // delete by id
    .delete("/:userId", expressAsyncHandler(userController.delete))

    // change password by id
    .post(
        "/change-password/:userId",
        validatorHelper.body(changePasswordValidation),
        authenticationMiddleware,
        expressAsyncHandler(userController.changePassword)
    );

module.exports = routes;
