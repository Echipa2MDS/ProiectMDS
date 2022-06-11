const  {JwtAuthHandler} = require("../middleware/auth");

async function usersRoutes(fastify, options) {
    const logoutUser = require("../controllers/login/logout");

    fastify
        .addHook("onRequest", JwtAuthHandler(fastify))
        .delete('/logout/:email', logoutUser())
}

module.exports = usersRoutes;