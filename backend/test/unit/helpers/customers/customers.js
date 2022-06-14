const sinon = require("sinon"),
    rewire = require("rewire"),
    assert = require("assert"),
    {expect} = require("chai"),
    rewired = rewire("../../../../src/helpers/customers"),
    {Db} = require("mongodb");

describe("customers helpers unit tests", () => {

    describe("async function insertChangelog(changelog)", () => {
        const sandbox = sinon.createSandbox(),
            {insertCustomer} = rewired;

        it("should insert customer", async () => {
            const v4 = sandbox.stub().returns("dc71ecad-ec9e-4f2f-aa91-ee6acbf97988"),
                insertOne = sandbox.stub().resolves(),
                mongo = sandbox.createStubInstance(Db),
                customer = {
                    customer_id: "dc71ecad-ec9e-4f2f-aa91-ee6acbf97988",
                    firstName: "Andrei",
                    lasName: "Begiu",
                    phoneNo: "32523523"
                },
                {customer_id} = customer;

            mongo.collection.returns({insertOne});

            const mocks = {
                    uuid: {
                        v4,
                    },
                    env: {mongo},
                },
                reset = rewired.__set__(mocks);

            const result = await insertCustomer(customer);

            sandbox.assert.calledOnceWithExactly(v4);
            sandbox.assert.calledOnceWithExactly(mongo.collection, "customers");
            sandbox.assert.calledOnceWithExactly(insertOne, customer);

            const order = [
                v4,
                mongo.collection,
                insertOne,
            ];

            sandbox.assert.callOrder(...order);

            expect(result).to.be.deep.equal({customer_id});

            reset();
        });

        it("should reject with mongo errpr", async () => {
            const v4 = sandbox.stub().returns("dc71ecad-ec9e-4f2f-aa91-ee6acbf97988"),
                insertOne = sandbox.stub().rejects(new Error("MongoError")),
                mongo = sandbox.createStubInstance(Db),
                customer = {
                    customer_id: "dc71ecad-ec9e-4f2f-aa91-ee6acbf97988",
                    firstName: "Andrei",
                    lasName: "Begiu",
                    phoneNo: "32523523"
                },
                {customer_id} = customer;

            mongo.collection.returns({insertOne});

            const mocks = {
                    uuid: {
                        v4,
                    },
                    env: {mongo},
                },
                reset = rewired.__set__(mocks);

            await assert.rejects(insertCustomer(customer), new Error("Error: MongoError"));

            sandbox.assert.calledOnceWithExactly(v4);
            sandbox.assert.calledOnceWithExactly(mongo.collection, "customers");
            sandbox.assert.calledOnceWithExactly(insertOne, customer);

            const order = [
                v4,
                mongo.collection,
                insertOne,
            ];

            sandbox.assert.callOrder(...order);
            reset();
        });
    });
});      