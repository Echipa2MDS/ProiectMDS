const { readCustomer } = require("../../helpers/customers");

async function handler(req, res) {
    const { customer_id } = req.params;
    return readCustomer(customer_id);
}

module.exports = handler;
