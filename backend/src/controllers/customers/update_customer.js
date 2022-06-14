const { updateCustomer } = require("../../helpers/customers");

async function handler(req, res) {
    const { customer_id } = req.params;
    await updateCustomer(customer_id, req.body);
    return "";
}

module.exports = handler;
