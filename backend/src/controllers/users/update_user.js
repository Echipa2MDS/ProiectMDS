const { updateUser } = require("../../helpers/users");

async function handler(req, res) {
    const { user_id } = req.pramas;
    await updateUser(user_id, req.body);
    return "";
}

module.exports = handler;
