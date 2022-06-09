async function usersRoutes(fastify, options) {
    const createUser = require("../controllers/users/create_user"),
        listUsers = require("../controllers/users/list_users"),
        readUser = require("../controllers/users/read_user"),
        updateUser = require("../controllers/users/update_user");

    fastify.addHook("onRequest", async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {          
             throw new Error(err);
        }
    })

    fastify
        .post('/', {}, createUser)
        .get('/', {}, listUsers)
        .get('/:user_id', {}, readUser)
        .put('/:user_id', {}, updateUser);
}

module.exports = usersRoutes;