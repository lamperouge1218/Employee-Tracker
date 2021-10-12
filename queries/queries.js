// Requires
const db = require("../db/connection");
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        name: "addRoleTitle",
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
        type: "list",
        name: "empRole",
        message: "What is the Employee's role?",
        choices: [],
    },

    {
        type: "list",
        name: "empManager",
        message: "Who is this employee's managaer?",
        choices: [],
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
            // Query function to put user-supplied department into the department table
            db.query(`INSERT INTO department(name) VALUES ("${response.addDept}")`, function (err, results) {
                if (err) {
                    throw err;
                }
                console.log("Your department has been added to the database!")
            })
        })
};

function addRoles() {
    // Sets the choices array in the addRoles question to empty
    addRole[2].choices = [];
    // Query to select both id and name column from department table
    db.query("SELECT id, name FROM department", function (err, results) {
        if (err) {
            throw err;
        }
        // Iterates over the array of results provided by the above query
        results.forEach(department => {
            // Pushes a string, department.name, onto the addRole.choices array to populate with current data from db
            addRole[2].choices.push(department.name)
        })
        // Inquirer prompt to ask questions to user
        inquirer
            .prompt(addRole)
            .then((response) => {
                // Creates addRoleId variable so that proper attribution to proper department can be done later
                let addRoleId = "";
                // Iterates, again, over the results array, this time checking that department.name matches the 
                // department selected by user
                results.forEach(department => {
                    // If the above is true, addRoleId now has the value of that department's id
                    if (department.name === response.addRoleDept) {
                        addRoleId = department.id;
                    }
                })
                // Query function to put information added into the role table
                db.query(`INSERT INTO _role(title, salary, department_id) VALUES ("${response.addRoleTitle}", ${response.addRoleSalary}, ${addRoleId})`, function (err, results) {
                    if (err) {
                        throw err;
                    }
                    console.log("Your role has been added to the database!")
                })
            });
    });
};

function addEmployees() {
    const roleManJoin = `
    SELECT _role.id AS role_id, _role.title, managers.id, managers.first_name, managers.last_name
    FROM _role 
    LEFT JOIN (SELECT id, first_name, last_name, role_id
    FROM employee WHERE manager_id 
    IS NULL) AS managers ON _role.id = managers.role_id`;

    addEmployee[2].choices = [];
    addEmployee[3].choices = ["None",];

    db.query(roleManJoin, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        results.forEach(data => {
            if (data.id !== null) {
                addEmployee[3].choices.push(`${data.first_name} ${data.last_name}`)
            }
            addEmployee[2].choices.push(data.title);
        })
        inquirer
            .prompt(addEmployee)
            .then((response) => {
                console.log(response);
                let empRoleId = "";
                let empManId = "";
                results.forEach(data => {
                    if (data.title === response.empRole) {
                        empRoleId = data.role_id;
                    }
                    if (`${data.first_name} ${data.last_name}` === response.empManager) {
                        empManId = data.id
                    }

                })
                console.log(empRoleId);
                console.log(empManId);
                // We need role_id and manager_id to be added to the VALUES to be inserted into the employee table
                // db.query(INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (`${response.firstName}, ${response.lastName}, ${role_id (find this)}, ${manager_id (find this)},`))
            })
    })

    // db.query("SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, empResults) {
    //     if (err) {
    //         throw err;
    //     }
    //     empResults.forEach(roleManId => {
    //         addEmployee[3].choices.push(`${roleManId.first_name} ${roleManId.last_name}`)
    //     })
    inquirer
        .prompt(addEmployee)
        .then((response) => {
            console.log(response);
            let empRoleId = "";
            let empManId = "";
            // We need role_id and manager_id to be added to the VALUES to be inserted into the employee table
            // db.query(INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (`${response.firstName}, ${response.lastName}, ${role_id (find this)}, ${manager_id (find this)},`))
        })
    // })


};

module.exports = { listDepartments, listRoles, listEmployees, addDepartment, addRoles, addEmployees }