"use strict";

const { PAYMENT_STATUS } = require("../helpers/constant.helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("payments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
            },
            productId: {
                type: Sequelize.INTEGER,
                references: { model: "products", key: "id" },
            },
            invoiceId: {
                type: Sequelize.STRING,
            },
            txnId: {
                type: Sequelize.STRING,
            },
            paidAmount: {
                type: Sequelize.DOUBLE,
            },
            paymentStatus: {
                type: Sequelize.ENUM(...Object.values(PAYMENT_STATUS)),
                defaultValue: PAYMENT_STATUS.PENDING,
            },
            dateTime: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("payments");
    },
};
