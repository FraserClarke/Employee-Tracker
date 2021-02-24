const mysql  = require('mysql');
const cTable = require('console.table');
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'

  // Be sure to update with your own MySQL password!
  password: 'leopard55', // Incorrect password = Access denied error
  database: 'employee_db', // Make sure this is an existing database
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});



const runSearch = () => {
  inquirer
  .prompt({
    name: 'action',
    type: 'rawlist',
    message: 'What would you like to do?',
    choices: [
      'View Employees',
    ],
  })
  .then((answer) => {
    switch (answer.action) {
      case 'View Employees':
       employeeView();
        break;

      

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });
};

const employeeView = () => {
    // inquirer
    //   .prompt({
    //     name: 'artist',
    //     type: 'input',
    //     message: 'What artist would you like to search for?',
    //   })
    //   .then((answer) => {
        const query = 'SELECT id, first_name, last_name, role_id, manager_id  FROM employee '; // WHERE ? --USE FOR ADDING/SEARCHING
        // because viewing no need for where
        connection.query(query, {},  (err, res) => { //might be null if no results...dummy emplyees required.
          res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            console.log(
              `Position: ${id} || `// Song: ${song} || Year: ${year}`
            );
          });
          runSearch();
        });
     // });
  };
  runSearch();

// Finish schema file, correct syntax etc.