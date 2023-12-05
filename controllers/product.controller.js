const { Op } = require("sequelize");
const { HTTP_STATUS_CODE } = require("../helpers/constant.helper");
const productService = require("../services/product.service");

module.exports = {
    /** Add */
    add: async (req, res) => {
        let user = await productService.save(req.body);
        return res.json({ error: false, message: "Product added successfully.", data: user });
    },

    /** List With pagination */
    list: async (req, res) => {
        let data = await productService.list(req.query);
        return res.json({ error: false, message: "Product list load successfully.", data });
    },

    /** update */
    update: async (req, res) => {
        let product = await productService.findOneByQuery({ id: req.params.productId });
        if (!product) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "Product not found!" });
        }

        await productService.updateByQuery({ id: product.id }, req.body);
        product = await productService.findOneByQuery({ id: product.id });
        return res.json({
            error: false,
            message: "Product updated successfully.",
            data: product,
        });
    },

    /** delete */
    delete: async (req, res) => {
        let product = await productService.findOneByQuery({ id: req.params.productId });
        if (!product) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "Product not found!" });
        }

        await productService.deleteByQuery({ id: req.params.productId });

        return res.json({
            error: false,
            message: "Product deleted successfully.",
        });
    },
};
