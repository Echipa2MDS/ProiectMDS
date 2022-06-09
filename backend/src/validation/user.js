const Item = {
    type: 'object',
    properties: {
        user: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: { type: 'string' }
            }
        }
    }
}

const registerUserOpts = {
    body: Item,
    response: {
        '2xx': Item
    }
}

const checkUserEmailOpts = {
    body: {
        type: 'object',
        required: ['email'],
        properties: {
            email: {
                type: 'string',
                format: 'email'
            }
        }
    }
}

const checkUserPasswordOpts = {
    body: {
        type: 'object',
        required: ['password'],
        properties: {
            password: { type: 'string' }
        }
    }
}

module.exports = { registerUserOpts, checkUserEmailOpts, checkUserPasswordOpts }