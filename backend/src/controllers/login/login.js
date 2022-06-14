'use strict'
const {
    checkUserEmailDb,
    checkUserPasswordDb,
} = require('../../helpers/users')

function checkUserEmailHandler() {
    return async(req, res) => {
        try {
            const user = await checkUserEmailDb(req.body.email);
            return {user};
        } catch (err) {
            throw err;
        }
    }
}

function checkUserPasswordHandler(fastify) {
    return async(req, res) => {
        try {
            const email = req.query.email,
                password = req.body.password;
            const token = await checkUserPasswordDb(fastify, email, password);
            return token;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { checkUserEmailHandler, checkUserPasswordHandler }