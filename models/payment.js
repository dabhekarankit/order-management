const { Model } = require("sequelize");
const { PAYMENT_STATUS } = require("../helpers/constant.helper");
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Payment.init(
        {
            userId: DataTypes.NUMBER,
            productId: DataTypes.NUMBER,
            invoiceId: DataTypes.STRING,
            txnId: DataTypes.STRING,
            paidAmount: DataTypes.DOUBLE,
            paymentStatus: DataTypes.ENUM(...Object.values(PAYMENT_STATUS)),
            dateTime: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Payment",
        }
    );
    return Payment;
};
