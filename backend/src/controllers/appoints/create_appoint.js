const { createAppoint } = require("../../helpers/appoint");

async function handler(req, res) {
    const appoint = req.body;
    return createAppoint(appoint);
}

module.exports = handler;