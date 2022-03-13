'use strict'

const fastify = require('fastify')({ logger: true }),
    env = require("./env/index"),
    { MongoClient } = require("mongodb");


const client = new MongoClient(uri);

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
        // await env.mongo.collection("users").insertOne({ detalii: { nume: "paul" } })
        const query = {
            detalii: {
                nume: "paul"
            }
        };
        console.log(await env.mongo.collection("users").findOne(query))
    } catch (error) {
        console.log(error);
    }
}

module.exports = { run }