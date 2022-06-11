const schema = require("../validation/user");

async function usersRoutes(fastify, options) {
    const registerUser = require("../controllers/login/register"),
        {
            checkUserEmailHandler,
            checkUserPasswordHandler,
        } = require("../controllers/login/login");

    fastify
        .post('/registerUser', registerUser(fastify))
        .post('/checkUserEmail', checkUserEmailHandler())
        .post('/checkUserPassword', checkUserPasswordHandler(fastify));
}

module.exports = usersRoutes;