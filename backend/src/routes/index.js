async function routes(fastify, options) {
    fastify
        .register(require('./users'), {prefix: '/users'})
        .register(require('./login'))
        .register(require("./appoints"), {prefix: '/appoints'})
        .register(require("./customers"), {prefix: '/customers'});
}

module.exports = {
    routes,
}