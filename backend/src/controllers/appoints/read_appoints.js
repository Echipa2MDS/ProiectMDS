const { readAppoint } = require("../../helpers/appoint");

async function handler(req, res) {
    const { appoint_id } = req.params;
    return readAppoint(appoint_id);
}

module.exports = handler;
