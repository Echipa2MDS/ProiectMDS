const { readUsers } = require("../../helpers/users"),
    {sanitizeQuery} = require("../../utils");

async function handler(req, res) {
    const query = sanitizeQuery(req.query),
        {
            page,
            limit,
        } = req.query
    return readUsers(query, page, limit);
}

module.exports = handler;
