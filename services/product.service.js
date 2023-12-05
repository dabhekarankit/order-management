const { Op } = require("sequelize");
const { Product } = require("../models");

module.exports = {
    /** save */
    save: async (data) => {
        return await Product.create(data);
    },

    /** find one by query */
    findOneByQuery: async (where) => {
        return await Product.findOne({ where });
    },

    /** List with pagination */
    list: async (query) => {
        const limit = +query.limit;
        const offset = (+query.page - 1) * limit;

        let where = {};

        if (query.search) {
            where = {
                ...where,
                [Op.or]: [{ name: { [Op.like]: `%${query.search}%` } }],
            };
        }
        let data = await Product.findAndCountAll({
            where,
            offset,
            limit,
            attributes: [
                "id",
                "name",
                "originalAmount",
                "discountedAmount",
                "createdAt",
                "updatedAt",
            ],
        });
        return {
            meta: {
                totalCounts: data.count,
                totalPages: Math.ceil(data.count / limit),
                currentPage: +query.page,
                limit,
            },
            data: data.rows,
        };
    },

    /** update */
    updateByQuery: async (where, data) => {
        return await Product.update(data, { where });
    },

    /** delete */
    deleteByQuery: async (where, data) => {
        return await Product.destroy({ where });
    },
};
