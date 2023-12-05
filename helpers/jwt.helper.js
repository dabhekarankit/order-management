const jwt = require("jsonwebtoken");

module.exports = {
    createToken: (user) => {
        return jwt.sign({ id: user.id }, process.env.APP_KEY, {
            expiresIn: "30d",
        });
    },
};
