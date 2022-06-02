'use strict'

const fastify = require('fastify')({ logger: true }),
    env = require("./env/index"),
    { MongoClient } = require("mongodb"),
    { insertUser } = require("../helpers/users")
require('dotenv').config({ path: "./src/resources/.env" });
const client = new MongoClient(process.env.MONGO_URI);


function startServer() {
    fastify.listen(3000, function (error, address) {
        if (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    });
}

async function startDatabase() {
    await client.connect();
    // Establish and verify connection
    await client.db("management").command({ ping: 1 });
    console.log("Connected successfully to database");
    return client.db("management");
}

async function run() {
    try {
        startServer();
        env.mongo = await startDatabase();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { run }