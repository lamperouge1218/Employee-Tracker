// Requires
const db = require("../db/connection");
const inquirer = require('inquirer');
const prompts = require("../index");

// Add Department
const addDept = [
    {
        type: "input",
        name: "addDept",
        message: "What department would you like to add?",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a department to add");
                return false;
            }
        },
    },
];

// Add Role
const addRole = [
    {
        type: "input",
        name: "addRole",
        message: "What role would you like to add?",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a role to add");
                return false;
            }
        },
    },

    {
        type: "input",
        name: "addRoleSalary",
        message: "What is the salary for this role",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a salary");
                return false;
            }
        },
    },

    {
        type: "list",
        name: "addRoleDept",
        message: "What department is this role a part of?",
        choices: []
    },
];

// Add Employee
const addEmployee = [
    {
        type: "input",
        name: "firstName",
        message: "What is the Employee's first name?",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a first name");
                return false;
            }
        },
    },

    {
        type: "input",
        name: "lastName",
        message: "What is the Employee's last name?",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a last name");
                return false;
            }
        },
    },

    {
        type: "input",
        name: "empRole",
        message: "What is the Employee's role?",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a role");
                return false;
            }
        },
    },

    {
        type: "list",
        name: "empManager",
        message: "What is the ID of this employee's manager?",
        choices: [2, 4, 6, 8, 10, 12],
    },
];

// Database query to select all information from the department table.
function listDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            throw err;
        }
        console.table(results);
    });
};

// Database query to select all information from the _role table.
function listRoles() {
    db.query('SELECT * FROM _role', function (err, results) {
        if (err) {
            throw err;
        }
        console.table(results);
    });
};

// Database query to select all information from the employee table.
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
            console.log(response);
            // Query function to put information added into the dept table
        })
};

function addRoles() {
    db.query("SELECT name FROM department", function (err, results) {
        if (err) {
            throw err;
        }
        results.forEach(department => {
            // console.log(department.name)
            addRole[2].choices.push(department.name)
            console.log(addRole[2].choices);
        })
        
        inquirer
            .prompt(addRole)
            .then((response) => {
                console.log(response);
                // Query function to put information added into the role table
            });
    });

};

function addEmployees() {
    inquirer
        .prompt(addEmployee)
        .then((response) => {
            console.log(response);
            // Query function to put information added into the employee table
            // db.query(INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (`${response.firstName}, ${response.lastName}, ${response.empRole}, ${response.empManager},`))
        })
};

module.exports = { listDepartments, listRoles, listEmployees, addDepartment, addRoles, addEmployees }