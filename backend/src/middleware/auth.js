'use strict'
// const fastifyPlugin = require('fastify-plugin');
const {readUser} = require("../helpers/users");

function JwtAuthHandler(fastify) {
    return async(req, res) => {
        try {
            await req.jwtVerify();

            const token = req.headers.authorization.split(' ')[1],
                jwt = await fastify.jwt.decode(token),
                userId = jwt.uId,
                user = await readUser(userId);

            if (!user) {
                throw new Error("The user dosen't exist.");
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {JwtAuthHandler};

// module.exports = fastifyPlugin(async(fastify) => {
//     fastify.decorate('jwtauth', JwtAuthHandler(fastify))
// })