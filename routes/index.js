const express = require("express");
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const paymentRoutes = require("./payment.routes");
const routes = express.Router();
const swaggerHelper = require("../helpers/swagger.helper");

routes
    .use("/api/", swaggerHelper)
    .use("/api/v1/users", userRoutes)
    .use("/api/v1/products", productRoutes)
    .use("/api/v1/payments", paymentRoutes);

module.exports = routes;
