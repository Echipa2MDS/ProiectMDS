const { deleteAppoint } = require("../../helpers/appoint");

async function handler(req, res) {
    const {appoint_id} = req.params;
    return deleteAppoint(appoint_id);
}

module.exports = handler;