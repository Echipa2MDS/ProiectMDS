const { updateAppoint } = require("../../helpers/appoint");

async function handler(req, res) {
    const { appoint_id } = req.params;
    await updateAppoint(appoint_id, req.body);
    return "";
}

module.exports = handler;
