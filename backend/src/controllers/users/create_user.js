const { insertUser } = require("../../helpers/users");

async function handler(req, res) {
    const user = req.body;
    return insertUser(user);
}

module.exports = handler;