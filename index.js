// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// Requires 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Set up database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 's!LUJ^St2N-U*6pT',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);


// Inquire Prompts
// What would you like to do?
const initQuestion = [
    {
        type: "list",
        name: "selectList",
        message: "What would you like to do?",
        choices: ["View all employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
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
        message: "Who is the Employee's manager?",
        choices: [],
    },
];

// Update Employee Role
const updateEmpRole = [
    {
        type: "list",
        name: "updateRole",
        message: "Which Employee would you like to update",
        choices: []
    },

    {
        type: "input",
        name: "updateRole2",
        message: "What is the Employee's new role",
        validate: answer => {
            if (answer) {
                return true;
            } else {
                console.log("Please enter a new role");
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
        choices: ["Tech Support", "Account Coordinators", "Asset Recovery", "Engineering", "IT", "Shipping"]

    },
];

// Add Deparment
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

// Quit

function init() {
    console.log("Welcome to the Employee Management System");
    inquirer
        .prompt(initQuestion)
        .then((response) => {
            switch (response) {
                case "View all employees":

                    break;

                case "Add Employee":

                    break;

                case "Update Employee Role":

                    break;

                case "View All Roles":

                    break;

                case "Add Role":

                    break;

                case "View All Departments":

                    break;

                case "Add Department":

                    break;

                case "Quit":

                    break;

                default:
                    break;
            }
        })
}

init();