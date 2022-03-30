require('dotenv/config');

const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;


const database = {
    dialect: dbDialect,
    host: dbHost,
    database: dbUsername,
    username: dbUsername,
    password: dbPassword,
    define: {
        timeStamps: true,
        underScored: true,
    }
};

module.exports = database;