const { insertuser } = require("../../helpers/users");

async function handler(req, res) {
    const user = req.body;
    return insertuser(user);
}

module.exports = handler;