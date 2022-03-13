"use strict"

const ProxyHandler = require("./proxy_handler");

const target = {},
    handler = new ProxyHandler(),
    proxy = new Proxy(target, handler);

module.exports = proxy;