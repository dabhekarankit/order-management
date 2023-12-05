const { HTTP_STATUS_CODE } = require("../helpers/constant.helper");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

module.exports = async (req, res, next) => {
    let token = req.header("authorization").replace("Bearer ", "");

    let decodedToken = jwt.verify(token, process.env.APP_KEY);
    let user = await userService.findOneByQuery({ id: decodedToken.id });

    if (!user) {
        return res
            .status(HTTP_STATUS_CODE.UNAUTHORIZE)
            .json({ error: true, message: "Unauthorized" });
    }

    req.user = user;

    next();
};
