function sanitizeQuery(query) {
    const sanitized = {};

    for(const param in query) {
        if(param !== "page" && param !== "limit") {
            sanitized[param] = query[param];
        }
    }
    
    return sanitized;
}

module.exports = {
    sanitizeQuery,
};