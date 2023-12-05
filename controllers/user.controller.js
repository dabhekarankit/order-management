const { Op } = require("sequelize");
const { encodeString, compareString } = require("../helpers/bcrypt.helper");
const { HTTP_STATUS_CODE } = require("../helpers/constant.helper");
const { createToken } = require("../helpers/jwt.helper");
const userService = require("../services/user.service");

module.exports = {
    /** Register */
    register: async (req, res) => {
        const checkEmail = await userService.findOneByQuery({ email: req.body.email });
        if (checkEmail) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "This email is already register with us." });
        }

        const checkMobile = await userService.findOneByQuery({ mobile: req.body.mobile });
        if (checkMobile) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "This mobile number is already register with us." });
        }
        req.body.password = encodeString(req.body.password);
        let user = await userService.save(req.body);
        delete user.dataValues.password;

        user.dataValues.accessToken = createToken(user);
        return res.json({ error: false, message: "User register successfully.", data: user });
    },

    /** Login */
    login: async (req, res) => {
        const user = await userService.findOneByQuery({ email: req.body.email });
        if (!user) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "Invalid credentials" });
        }

        if (!compareString(req.body.password, user.password)) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "Invalid credentials" });
        }

        delete user.dataValues.password;
        user.dataValues.accessToken = createToken(user);
        return res.json({ error: false, message: "User login successfully.", data: user });
    },

    /** List With pagination */
    list: async (req, res) => {
        let data = await userService.list(req.query);
        return res.json({ error: false, message: "User list load successfully.", data });
    },

    /** detail by id */
    detail: async (req, res) => {
        const user = await userService.findOneByQuery({ id: req.params.userId });
        if (!user) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "User not found!" });
        }

        delete user.dataValues.password;

        return res.json({
            error: false,
            message: "User details load successfully.",
            data: user,
        });
    },

    /** update details */
    update: async (req, res) => {
        if (req.params.userId != req.user.id) {
            return res
                .status(HTTP_STATUS_CODE.FORBIDDEN)
                .json({ error: true, message: "You can't update other users details" });
        }

        let user = await userService.findOneByQuery({ id: req.params.userId });
        if (!user) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "User not found!" });
        }

        const checkEmail = await userService.findOneByQuery({
            id: { [Op.ne]: user.id },
            email: req.body.email,
        });
        if (checkEmail) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "This email is already register with us." });
        }

        const checkMobile = await userService.findOneByQuery({
            id: { [Op.ne]: user.id },
            mobile: req.body.mobile,
        });
        if (checkMobile) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "This mobile number is already register with us." });
        }
        await userService.updateByQuery({ id: user.id }, req.body);
        user = await userService.findOneByQuery({ id: user.id });
        delete user.dataValues.password;
        return res.json({
            error: false,
            message: "User updated successfully.",
            data: user,
        });
    },

    /** delete */
    delete: async (req, res) => {
        let user = await userService.findOneByQuery({ id: req.params.userId });
        if (!user) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "User not found!" });
        }

        await userService.deleteByQuery({ id: req.params.userId });

        return res.json({
            error: false,
            message: "User deleted successfully.",
        });
    },

    /** change password */
    changePassword: async (req, res) => {
        if (req.params.userId != req.user.id) {
            return res
                .status(HTTP_STATUS_CODE.FORBIDDEN)
                .json({ error: true, message: "You can't update other user password" });
        }

        let user = await userService.findOneByQuery({ id: req.params.userId });
        if (!user) {
            return res
                .status(HTTP_STATUS_CODE.NOT_FOUND)
                .json({ error: true, message: "User not found!" });
        }

        if (!compareString(req.body.oldPassword, user.password)) {
            return res
                .status(HTTP_STATUS_CODE.CONFLICT)
                .json({ error: true, message: "Invalid old password" });
        }

        await userService.updateByQuery(
            { id: user.id },
            { password: encodeString(req.body.password) }
        );

        return res.json({
            error: false,
            message: "Password changed successfully.",
        });
    },
};
