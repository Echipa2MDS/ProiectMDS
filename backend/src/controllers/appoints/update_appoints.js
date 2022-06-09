const { updateAppoint } = require("../../helpers/appoint");

async function handler(req, res) {
    const { appoint_id } = req.pramas;
    await updateAppoint(appoint_id, req.body);
    return "";
}

module.exports = handler;
