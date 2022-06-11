const { updateCustomer } = require("../../helpers/customers");

async function handler(req, res) {
    const { user_id } = req.params;
    await updateCustomer(user_id, req.body);
    return "";
}

module.exports = handler;
