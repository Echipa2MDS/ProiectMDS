'use strict'

const fastify = require('fastify')({ logger: true }),
    env = require("./env/index"),
    { MongoClient } = require("mongodb");
require('dotenv').config({ path: "./src/resources/.env" });
const client = new MongoClient(process.env.MONGO_URI);

function startServer() {
    try {
        const {routes} = require('../routes/index');
        fastify.register(routes);
        // fastify.register(require("../middleware/auth"))
        fastify.register(require('@fastify/jwt'), {
            secret: env.auth
        });
        fastify.register(require('@fastify/cookie'), {
            secret: env.auth
        });

        fastify.listen(3000, function (error, address) {
            if (error) {
                fastify.log.error(error);
                process.exit(1);
            }
        });
    } catch (error) {
        fastify.log.error("Error while starting the service %s \n %s", error.message, error.stack);
    }
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
        env.auth = process.env.JWT_SECRET;
        startServer();
        env.mongo = await startDatabase();
        env.salt = process.env.SALT;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { run }