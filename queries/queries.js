// Requires
const db = require("../db/connection");




// Database query to select all information from the department table.
function listDepartments() {
    console.log("hello world");
    db.query('SELECT * FROM department', function (err, results) {  
        if (err) {
            throw err;
        }      
        console.table(results);
      });
};

// function listRoles() {
//     db.query('SELECT * FROM _role', function (err, results) {
//         console.table(results);
//       });
// };

// function listEmployees() {
//     db.query('SELECT * FROM employee', function (err, results) {
//         console.table(results);
//       });
// };

module.exports = { listDepartments }