const {JwtAuthHandler} = require("../middleware/auth")

async function usersRoutes(fastify, options) {
    const createCustomer = require("../controllers/customers/create_customer"),
        listCustomers = require("../controllers/customers/list_customers"),
        readCustomer = require("../controllers/customers/read_customer"),
        updateCustomer = require("../controllers/customers/update_customer");

    fastify
        .addHook("onRequest", JwtAuthHandler(fastify))
        .post('/', {}, createCustomer)
        .get('/', {}, listCustomers)
        .get('/:user_id', {}, readCustomer)
        .put('/:user_id', {}, updateCustomer);
}

module.exports = usersRoutes;