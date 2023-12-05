const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

module.exports = {
    encodeString: (password) => {
        const SALT = genSaltSync(10);
        return hashSync(password, SALT);
    },

    compareString: (string, hashString) => {
        return compareSync(string, hashString);
    },
};
