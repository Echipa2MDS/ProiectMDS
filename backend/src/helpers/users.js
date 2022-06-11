const env = require("../resources/env/index"),
    uuid = require("uuid"),
    lodash = require("lodash"),
    bcrypt = require("bcrypt"),
    {generateToken} = require("./login/auth");

async function insertUser(user) {
    const user_id = uuid.v4();

    try {
        user.password = await bcrypt.hash(user.password, parseInt(env.salt));

        to_insert = {
            user_id,
            ...user,
        };
        await env.mongo.collection("users").insertOne(to_insert);
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            throw new Error("User already exists");
        }
        throw new Error(error);
    }
    return user_id;
}

async function updateUser(user_id, data) {
    let op_result = null;
    const filter = { user_id },
        update = { $set: data };

    if (lodash.isEmpty(update.$set)) {
        return;
    }

    try {
        op_result = await env.mongo.collection("users").updateOne(filter, update);
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            throw new Error("User already exists");
        }
        throw new Error(error);
    }

    if (op_result.matchedCount === 0) {
        throw new Error("User not found");
    }
}

async function readUsers(query, page, limit = 20) {
    try {
        const skip = page * limit,
            project = { _id: 0 },
            filter = {};

        const cursor = env.mongo.collection("users").find(filter),
            count = await cursor.count();

        cursor.skip(skip);
        cursor.limit(limit);
        cursor.project(project);

        const users = await cursor.toArray();
        return {
            count,
            users
        };
    } catch (error) {
        throw new Error(error)
    }
}

async function readUser(user_id) {
    let user = null;
    const query = { user_id },
        projection = { _id: 0 };

    try {
        user = await env.mongo.collection("users").findOne(query, projection);
    } catch (error) {
        throw new Error(error);
    }

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function deleteUser(user_id) {
    let op_result = null;
    const query = {user_id};

    try {
        op_result = await env.mongo.collection("users").deleteOne(query);
    } catch(error) {
        throw new Error(error);
    }

    if(op_result.deletedCount === 0) {
        throw new Error("The user dosen't exist");
    }
}

async function checkUserEmailDb(email) {
    const query = {email},
        user = await env.mongo.collection("users").findOne(query);
    if (user) {
        return { status: 0 }
    } else {
        throw new Error("The email is not associated to an account");
    }
}

async function checkUserPasswordDb(fastify, email, password) {
    const query = {email},
        user = await env.mongo.collection("users").findOne(query),
        match = await bcrypt.compare(password, user.password);
    if (match) {
        const token = await generateToken(fastify, user);
        return token;
    } else {
        throw new Error("The password is inccorrect.");
    }
}

module.exports = {
    insertUser,
    updateUser,
    readUsers,
    readUser,
    deleteUser,
    checkUserEmailDb,
    checkUserPasswordDb,
}