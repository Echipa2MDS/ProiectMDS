const { readUsers } = require("../../helpers/users"),
    {sanitizeQuery} = require("../../utils");

async function handler(req, res) {
    const query = sanitizeQuery(request.query),
        {
            page,
            limit,
        } = query.query
    await readUsers(query, page, limit);
    return "";
}

module.exports = handler;
