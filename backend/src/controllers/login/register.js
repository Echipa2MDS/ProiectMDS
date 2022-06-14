'use strict'
const env = require("../../resources/env/index"),
    {
        insertUser,
        readUser,
    } = require("../../helpers/users"),
    {generateToken} = require('../../helpers/login/auth');

function registerUserHandler(fastify) {
    return async(req, reply) => {
        try {
            const {user} = req.body,
                user_id = await insertUser(user),
                newUser = await readUser(user_id),
                token = await generateToken(fastify, newUser);
            return token;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = registerUserHandler