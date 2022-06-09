'use strict'
const env = require("../../resources/env/index");

async function generateToken(fastify, user) {
    const uId = user._id,
        eml = user.email,
        iat = new Date().getTime();

    const token = await fastify.jwt.sign({ uId, iat, eml }, { expiresIn: '1h' });
    await env.mongo.collection("tokens").insertOne({ userEmail: eml, token: token });
    return token;
}

async function deleteToken(email) {
    const token = await env.mongo.tokens.deleteOne({ userEmail: email })
    if (token.deletedCount == 1) {
        return token;
    } else {
        throw new Error("The user hasn't been found");
    }
}
module.exports = { generateToken, deleteToken }