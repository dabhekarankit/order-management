const { HTTP_STATUS_CODE, PAYMENT_STATUS } = require("../helpers/constant.helper");
const paymentService = require("../services/payment.service");

module.exports = {
    /** Add */
    add: async (req, res) => {
        const checkPayment = await paymentService.findOneByQuery({ invoiceId: req.body.invoiceId });
        if (checkPayment) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "For this invoice id payment already initiate" });
        }
        req.body.userId = req.user.id;
        req.body.dateTime = new Date();
        let payment = await paymentService.save(req.body);
        return res.json({
            error: false,
            message: "Payment initiated successfully.",
            data: payment,
        });
    },

    /** payment success / failed status */
    paymentStatus: async (req, res) => {
        const checkPayment = await paymentService.findOneByQuery({ id: req.body.paymentId });
        if (!checkPayment) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "Payment data not found." });
        }

        if (checkPayment.status != PAYMENT_STATUS.PENDING) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "Payment status already updated." });
        }

        await paymentService.updateByQuery(
            { id: req.body.paymentId },
            { paymentStatus: req.body.paymentStatus }
        );
        return res.json({ error: false, message: "Payment status updated successfully." });
    },
};
