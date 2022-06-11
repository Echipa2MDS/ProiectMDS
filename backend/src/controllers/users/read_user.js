const { readUser } = require("../../helpers/users");

async function handler(req, res) {
    const { user_id } = req.params;
    return readUser(user_id);
}

module.exports = handler;
