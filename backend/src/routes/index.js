async function routes(fastify, options) {
    fastify
        .register(require('./users'), {prefix: '/users'})
        .register(require('./login'));
}

module.exports = {
    routes,
}