const env = require("../resources/env/index"),
    uuid = require("uuid"),
    lodash = require("lodash"),
    {
        deleteAppointsOfCustomer,
    } = require('./appoint')

async function insertCustomer(customer) {
    const customer_id = uuid.v4(),
        to_insert = {
            customer_id,
            ...customer,
        };

    try {
        await env.mongo.collection("customers").insertOne(to_insert);
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            throw new Error("Customer already exists");
        }
        throw new Error(error);
    }

    return { customer_id };
}

async function updateCustomer(customer_id, data) {
    let op_result = null;
    const filter = { customer_id },
        update = { $set: data };

    if (lodash.isEmpty(update.$set)) {
        return;
    }

    try {
        op_result = await env.mongo.collection("customers").updateOne(filter, update);
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            throw new Error("Customer already exists");
        }
        throw new Error(error);
    }

    if (op_result.matchedCount === 0) {
        throw new Error("Customer not found");
    }
}

async function readCustomers(query, page, limit = 20) {
    try {
        const skip = page * limit,
            project = { _id: 0 },
            filter = {};

        const cursor = env.mongo.collection("customers").find(filter),
            count = await cursor.count();

        cursor.skip(skip);
        cursor.limit(limit);
        cursor.project(project);

        const customers = cursor.toArray();

        return {
            count,
            customers
        };
    } catch (error) {
        throw new Error(error)
    }
}

async function readCustomer(customer_id) {
    let customer = null;
    const query = { customer_id },
        projection = { _id: 0 };

    try {
        customer = await env.mongo.collection("customers").findOne(query, projection);
    } catch (error) {
        throw new Error(error);
    }

    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
}

async function insertAppointToCustomer(customer_id, appoit_id) {
    let op_result = null;
    const query = {customer_id},
        update = {$push: {appoints: appoit_id}};

    try {
        op_result = await env.mongo.collection("customers").updateOne(query, update);
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            throw new Error("Customer already exists");
        }
        throw new Error(error);
    }
    
    if (op_result.matchedCount === 0) {
        throw new Error("Customer not found");
    }
}

async function deleteCustomer(customer_id) {
    let op_result = null;
    const query = {customer_id};

    try {
        op_result = await env.mongo.collection("customers").deleteOne(query);

        await deleteAppointsOfCustomer(customer_id);
    } catch(error) {
        throw new Error(error);
    }

    if(op_result.deletedCount === 0) {
        throw new Error("The uscustomer dosen't exist");
    }
}

async function deleteCustomerAppoint(customer_id, appoint_id) {
    let op_result = null;
    const query = {customer_id},
        update = {$pull: {appoints: appoint_id}}

    try {
        op_result = await env.mongo.collection("customers").updateOne(query, update);
    } catch(error) {
        throw new Error(error);
    }

    if(op_result.deletedCount === 0) {
        throw new Error("The appointment dosen't exist");
    }
}

module.exports = {
    insertCustomer,
    updateCustomer,
    readCustomers,
    readCustomer,
    insertAppointToCustomer,
    deleteCustomer,
    deleteCustomerAppoint,
}