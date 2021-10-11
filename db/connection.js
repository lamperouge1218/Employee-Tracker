const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // MySQL username,
        user: process.env.DB_USERNAME,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

module.exports = db;