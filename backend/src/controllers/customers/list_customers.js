const { readCustomers } = require("../../helpers/customers"),
    {sanitizeQuery} = require("../../utils");

async function handler(req, res) {
    const query = sanitizeQuery(req.query),
        {
            page,
            limit,
        } = req.query
    return readCustomers(query, page, limit);
}

module.exports = handler;
