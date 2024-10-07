require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

dbConnection.connect((err) => {
    if (!err) {
        console.log("Database Connected");
        console.log("Host: ", process.env.DB_HOST); // Printing the host name
        console.log("User: ", process.env.DB_USER); // Printing the host name
        console.log("Password: ", process.env.DB_PASSWORD); // Printing the host name
        console.log("Database: ", process.env.DB_DATABASE); // Printing the host name

    } else {
        console.log("Database Not Connected");

    }
});

module.exports = dbConnection;
