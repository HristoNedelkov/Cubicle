const config = {
    development: {
        PORT: 3000,
        DB_CONNECTION: 'mongodb+srv://icko:ickocluster0@cluster0.jrp36.mongodb.net/cluster0?retryWrites=true&w=majority',
        SALT_ROUNDS: 3,
        SECRET: 'somesecret',
        COOKIE_NAME: 'USER_SESSION',
    },
    production: {
        PORT: 50000,
        DB_CONNECTION: 'insert mongodb atlas connection here',
        SALT_ROUNDS: 3,
        SECRET: 'somesecret',
        COOKIE_NAME: 'USER_SESSION',
    }
};

module.exports = config[process.env.NODE_ENV.trim()]