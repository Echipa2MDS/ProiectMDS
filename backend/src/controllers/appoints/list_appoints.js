const { readAppoints } = require("../../helpers/appoint"),
    {sanitizeQuery} = require("../../utils");

async function handler(req, res) {
    const query = sanitizeQuery(req.query),
        {
            page,
            limit,
        } = req.query
    return readAppoints(query, page, limit);
}

module.exports = handler;
