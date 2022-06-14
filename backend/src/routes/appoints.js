const {JwtAuthHandler} = require("../middleware/auth");

async function usersRoutes(fastify, options) {
    const createAppoint = require("../controllers/appoints/create_appoint"),
        listAppoint = require("../controllers/appoints/list_appoints"),
        readAppoint = require("../controllers/appoints/read_appoints"),
        deleteAppoint = require("../controllers/appoints/delete_appoints"),
        updateAppoint = require("../controllers/appoints/update_appoints");

    fastify
        .addHook("onRequest", JwtAuthHandler(fastify))
        .post('/', {}, createAppoint)
        .get('/', {}, listAppoint)
        .get('/:appoint_id', {}, readAppoint)
        .delete('/:appoint_id', {}, deleteAppoint)
        .patch('/:appoint_id', {}, updateAppoint);
}

module.exports = usersRoutes;