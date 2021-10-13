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

// Update Employee Role
const updateEmpRole = [
    {
        type: "list",
        name: "updateRole",
        message: "Which Employee would you like to update",
        choices: []
    },

    {
        type: "list",
        name: "updateRole2",
        message: "What is the Employee's new role",
        choices: []
    },
];

// Database query to select all information from the department table.
async function listDepartments() {
    await db.promise().query('SELECT * FROM department').then(([rows, fields]) => {
        console.table(rows);
    })
        .catch((error) => {
            console.log(error);
        })
};

// Database query to select all information from the _role table.
async function listRoles() {
    await db.promise().query('SELECT * FROM _role').then(([rows, fields]) => {
        console.table(rows);
    })
        .catch((error) => {
            console.log(error);
        })
};

// Database query to select all information from the employee table.
async function listEmployees() {
    await db.promise().query('SELECT * FROM employee').then(([rows, fields]) => {
        console.table(rows);
    })
        .catch((error) => {
            console.log(error);
        })
};

// Function to add a department to the deparment table in the name column
async function addDepartment() {
    await inquirer
        .prompt(addDept)
        .then(async (response) => {
            console.log(response);
            // Query function to put user-supplied department into the department table
            await db.promise().query(`INSERT INTO department(name) VALUES ("${response.addDept}")`).then(([rows, fields]) => {
                console.log("Your department has been added to the database!")
            })
        })
        .catch((error) => {
            console.log(error);
        })
};

// Function to add a role to the _role table utitlizing the department_id
async function addRoles() {
    // Sets the choices array in the addRoles question to empty
    addRole[2].choices = [];
    // Query to select both id and name column from department table
    await db.promise().query("SELECT id, name FROM department").then(async ([rows, fields]) => {
        // Iterates over the array of results provided by the above query
        rows.forEach(department => {
            // Pushes a string, department.name, onto the addRole.choices array to populate with current data from db
            addRole[2].choices.push(department.name)
        })
        // Inquirer prompt to ask questions to user
        await inquirer
            .prompt(addRole)
            .then(async (response) => {
                // Creates addRoleId variable so that proper attribution to proper department can be done later
                let addRoleId = "";
                // Iterates, again, over the results array, this time checking that department.name matches the 
                // department selected by user
                rows.forEach(department => {
                    // If the above is true, addRoleId now has the value of that department's id
                    if (department.name === response.addRoleDept) {
                        addRoleId = department.id;
                    }
                })
                // Query function to put information added into the role table
                await db.promise().query(`INSERT INTO _role(title, salary, department_id) VALUES ("${response.addRoleTitle}", ${response.addRoleSalary}, ${addRoleId})`).then(([rows, fields]) => {
                    console.log("Your role has been added to the database!")
                })
            });
    });
};

// Fucntion to add an employee to the employee table utilizing manager id to set the proper employee as their manager
// If the employee has no manager, their manager_id will be set to NULL
async function addEmployees() {
    // const containing our join query. The query looks to get data with which to fill out the 
    // choices for the last two questions in the addEmployee inquirer prompt
    const roleManJoin = `
    SELECT _role.id AS role_id, _role.title, managers.id, managers.first_name, managers.last_name
    FROM _role 
    LEFT JOIN (SELECT id, first_name, last_name, role_id
    FROM employee WHERE manager_id 
    IS NULL) AS managers ON _role.id = managers.role_id`;

    // Sets the choice arrays in the addEmployee inquirer prompt to empty sets 
    // (empManager always starts with none as the first option)
    addEmployee[2].choices = [];
    addEmployee[3].choices = ["None",];

    // Our actual query request from the information specified above
    await db.promise().query(roleManJoin).then(async ([rows, fields]) => {
        // Iterating over the results array sent back from our query
        rows.forEach(data => {
            // If the id column of the data returned, in this case manager_id from the employee table,
            // is not null, 
            if (data.id !== null) {
                addEmployee[3].choices.push(`${data.first_name} ${data.last_name}`)
            }
            addEmployee[2].choices.push(data.title);
        })

        await inquirer
            .prompt(addEmployee)
            .then(async (response) => {
                let empRoleId = "";
                let empManId = "NULL";
                rows.forEach(data => {
                    if (data.title === response.empRole) {
                        empRoleId = data.role_id;
                    }
                    if (`${data.first_name} ${data.last_name}` === response.empManager) {
                        empManId = data.id
                    }
                })
                console.log(empRoleId);
                console.log(empManId);
                await db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", ${empRoleId}, ${empManId})`).then(([rows, fields]) => {
                    console.log("Your employee has been added to the database!")
                })
                .catch((error) => {
                    console.log(error);
                })
                
            })
            .catch((error) => {
                console.log(error);
            })
    })
}

// Function to update an employee's role. Sets the employee's new role_id 
// to the proper id for the role selected
async function updateEmployeeRole() {
    const employeeRoleTable = `
    SELECT employee.first_name, employee.last_name, employee.role_id, _role.title
    FROM employee 
    JOIN _role ON employee.role_id = _role.id`;

    updateEmpRole[0].choices = [];
    updateEmpRole[1].choices = [];

    await db.promise().query(employeeRoleTable).then(async ([rows, fields]) => {
        rows.forEach(data => {
            updateEmpRole[0].choices.push(`${data.first_name} ${data.last_name}`);
            updateEmpRole[1].choices.push(data.title);
        })

        await inquirer
            .prompt(updateEmpRole)
            .then(async (response) => {
                let empNewRoleId = "";
                rows.forEach(data => {
                    if (data.title === response.updateRole2) {
                        empNewRoleId = data.role_id;

                    }
                })

                const firstLast = response.updateRole.split(" ");

                await db.promise().query(`UPDATE employee SET role_id = ${empNewRoleId} WHERE employee.first_name = "${firstLast[0]}" AND employee.last_name = "${firstLast[1]}"`).then(([rows, fields]) => {
                    console.log("This employee's role has been updated!")
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
    })
    .catch((error) => {
        console.log(error);
    })
}

// Quit function to exit out of application
function quit() {
    process.exit();
}

// Exports all of the functions above to index.js
module.exports = { listDepartments, listRoles, listEmployees, addDepartment, addRoles, addEmployees, updateEmployeeRole, quit }