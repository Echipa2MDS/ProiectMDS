const Item = {
    type: 'object',
    properties: {
        user: {
            type: 'object',
            required: ['email', 'password', "user_id"],
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: { type: 'string' },
                user_id: {type: 'uuid'},
            }
        }
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

module.exports = {checkUserEmailOpts, checkUserPasswordOpts }