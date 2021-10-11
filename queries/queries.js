// Requires
const db = require("../db/connection");
const inquirer = require('inquirer');



// Database query to select all information from the department table.
function listDepartments() {
    db.query('SELECT * FROM department', function (err, results) {  
        if (err) {
            throw err;
        }      
        console.table(results);
      });
};

function listRoles() {
    db.query('SELECT * FROM _role', function (err, results) {
        if (err) {
            throw err;
        }      
        console.table(results);
      });
};

function listEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            throw err;
        }      
        console.table(results);
      });
};

function addDepartment() {
    inquirer
        .prompt(addDept)
        .then((response) => {
            // Query function to put information added into the dept table
        })
};

function addRoles() {
    inquirer
        .prompt(addRole)
        .then((response) => {
            // Query function to put information added into the role table
        })
};

function addEmployees() {
    inquirer
        .prompt(addEmployee)
        .then((response) => {
            // Query function to put information added into the employee table
        })
};

module.exports = { listDepartments, listRoles, listEmployees }