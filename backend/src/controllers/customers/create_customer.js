const { insertCustomer } = require("../../helpers/customers");

async function handler(req, res) {
    const customer = req.body;
    return insertCustomer(customer);
}

module.exports = handler;