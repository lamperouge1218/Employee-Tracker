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
const cTable = require('console.table');
const queries = require("./queries/queries");


// Inquire Prompts
// What would you like to do?
const initQuestion = [
    {
        type: "list",
        name: "selectList",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Quit"
        ],
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

// Quit

// .then statements that then call init() after the function has been executed???
function init() {
    console.log("Welcome to the Employee Management System");
    inquirer
        .prompt(initQuestion)
        .then(response => {
            console.log(response);
            switch (response.selectList) {
                case "View All Departments":
                    queries.listDepartments();                    
                    break;

                case "View All Roles":
                    queries.listRoles();
                    break;

                case "View All Employees":
                    queries.listEmployees();
                    break;

                case "Add Department":
                    queries.addDepartment()
                    break;

                case "Add Role":
                    queries.addRoles()
                    break;

                case "Add Employee":
                    queries.addEmployees()
                    break;

                case "Update Employee Role":
                    break;

                case "Quit":
                    break;

                default:
                    break;
            }
        })
};

init();