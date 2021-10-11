// Requires
const mysql = require('mysql2');
const cTable = require('console.table');
require("dotenv").config();

// Set up database connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASS,
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

// Database query to select all information from the department table.
function listDepartments() {
    db.query('SELECT * FROM department', function (err, results) {        
        console.table(results);
      });
};

function listRoles() {
    db.query('SELECT * FROM _role', function (err, results) {
        console.table(results);
      });
};

function listEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
      });
};

module.exports = { listDepartments, listRoles, listEmployees, db }