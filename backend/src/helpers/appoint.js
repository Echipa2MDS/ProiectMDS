const env = require("../resources/env/index"),
    uuid = require("uuid"),
    lodash = require("lodash"),
    {
        readCustomer,
        insertAppointToCustomer,
        deleteCustomerAppoint,
    } = require("./customers");

async function createAppoint(appoint) {
    const appoint_id = uuid.v4(),
        {customer_id} = appoint,
        to_insert = {
            appoint_id,
            ...appoint,
        };

    if(appoint.date < Date.now()) {
        throw new Error("An appointment cannot be in a past date");
    }

    try {
        const customer = await readCustomer(customer_id);
        for(let i = 0; i < customer.appoints.length; i ++) {
            const existing_appoint = await readAppoint(customer.appoints[i]);
            if(existing_appoint.date === appoint.date) {
                throw new Error("The customer has already an appointment at that time");
            }
        }

        await env.mongo.collection("appoints").insertOne(to_insert);

        await insertAppointToCustomer(customer_id, appoint_id);
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            throw new Error("User already exists");
        }
        throw new Error(error);
    }

    return { appoint_id };
}

async function updateAppoint(appoint_id, data) {
    let op_result = null;
    const filter = { appoint_id },
        update = { $set: data };

    if (lodash.isEmpty(update.$set)) {
        return;
    }

    if(appoint.date < Date.now()) {
        throw new Error("An appointment cannot be in a past date");
    }

    try {
        op_result = await env.mongo.collection("appoints").updateOne(filter, update);
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            throw new Error("User already exists");
        }
        throw new Error(error);
    }

    if (op_result.matchedCount === 0) {
        throw new Error("User not found");
    }
}

async function readAppoints(query, page, limit = 20) {
    try {
        const skip = page * limit,
            project = { _id: 0 },
            filter = {};

        if(lodash.isEmpty(query)) {
            filter = {...query}
        }
        const cursor = env.mongo.collection("appoints").find(filter),
            count = await cursor.count();

        cursor.skip(skip);
        cursor.limit(limit);
        cursor.project(project);

        const appoints = cursor.toArray();

        return {
            count,
            appoints
        };
    } catch (error) {
        throw new Error(error)
    }
}

async function readAppoint(appoint_id) {
    let appoint = null;
    const query = { appoint_id },
        projection = { _id: 0 };

    try {
        appoint = await env.mongo.collection("appoints").findOne(query, projection);
    } catch (error) {
        throw new Error(error);
    }

    if (!appoint) {
        throw new Error("Appointment not found");
    }

    return appoint;
}

async function deleteAppointsOfCustomer(customer_id) {
    let op_result = null;
    const query = {customer_id};

    try {
        op_result = await env.mongo.collection("appoints").deleteMany(query);
    } catch(error) {
        throw new Error(error);
    }
}

async function deleteAppoint(appoint_id) {
    let op_result = null;
    const query = (appoint_id);

    try {
        const appoint = await readAppoint(appoint_id),
            {customer_id} = appoint;
        
        op_result = await env.mongo.collection("appoints").deleteOne(query);

        await deleteCustomerAppoint(customer_id, appoint_id);
    } catch(error) {
        throw new Error(error);
    }

    if(op_result.deletedCount === 0) {
        throw new Error("Appointment dosen't exist");
    }
}


module.exports = {
    createAppoint,
    updateAppoint,
    readAppoints,
    readAppoint,
    deleteAppointsOfCustomer,
    deleteAppoint,
}