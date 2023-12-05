const { HTTP_STATUS_CODE } = require("../helpers/constant.helper");

module.exports = (err, req, res, next) => {
    console.log(err);
    if (err && err.error && err.error.isJoi) {
        if (err.error.details[0]) {
            return res.status(HTTP_STATUS_CODE.UNPROCESSABLE).json({
                error: true,
                message: err.error.details[0].message,
            });
        }
    }

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: true,
            message: err.message,
        });
    } else {
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            error: true,
            message: err.message,
        });
    }
};
