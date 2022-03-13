"use streict"

class ProxyHandler {
    set(target, property, value) {
        if (typeof value === "undefined" || value === null) {
            throw new TypeError(`Cannot set undefined or null as value, ${value}`);
        }
        target[property] = value;
        return true;
    }

    get(target, property) {
        if (!target.hasOwnProperty(property)) {
            throw new TypeError(`The property ${property} is undefined`);
        }
        return target[property];
    }
}

module.exports = ProxyHandler;