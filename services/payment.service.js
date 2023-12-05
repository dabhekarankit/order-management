const { Op } = require("sequelize");
const { Payment } = require("../models");

module.exports = {
    /** save */
    save: async (data) => {
        return await Payment.create(data);
    },

    /** find one by query */
    findOneByQuery: async (where) => {
        return await Payment.findOne({ where });
    },

    /** update */
    updateByQuery: async (where, data) => {
        return await Payment.update(data, { where });
    },

    /** delete */
    deleteByQuery: async (where, data) => {
        return await Payment.destroy({ where });
    },
};
