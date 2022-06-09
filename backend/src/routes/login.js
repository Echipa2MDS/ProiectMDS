const schema = require("../validation/user")

async function usersRoutes(fastify, options) {
    const registerUser = require("../controllers/login/register"),
        {
            checkUserEmailHandler,
            checkUserPasswordHandler,
        } = require("../controllers/login/login");

    fastify
        .post('/registerUser',  { schema: schema.registerUserOpts }, registerUser(fastify))
        .post('/checkUserEmail',  { schema: schema.registerUserOpts }, checkUserEmailHandler())
        .post('/checkUserPassword',  { schema: schema.registerUserOpts }, checkUserPasswordHandler(fastify));
}

module.exports = usersRoutes;