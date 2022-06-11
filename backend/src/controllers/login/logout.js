const {deleteToken} = require("../../helpers/login/auth");

function logoutUserHandler() {
    return async(req, res) => {
        try {
            const email = req.params.email;
            const token = await deleteToken(email)
            return token;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = logoutUserHandler;