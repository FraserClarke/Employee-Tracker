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
  password: 'password', // Incorrect password = Access denied error
  database: 'employee_db', // Make sure this is an existing database
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});


    //MUST HAVE
//    View departments, roles, employees
//      Add departments, roles, employees
//       Update employee roles

        //Optional
 //Update employee managers
//  View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
       

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
  .then((res => {
    let action = res.action;
    switch (action) { //choice.action
      case 'View Employees':
        console.log(action);
      employeeView();
        break;

      

      default:
        console.log(`Invalid action: ${action}`);
        break;
        }
   // })
  
}));

// .then(res => {
//     Stuff
//     }
//     }
//     )}
}
const employeeView = () => {
    
//     const query =
//     'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const afterConnection = () => {
//     connection.query('SELECT * FROM products', (err, res) => {
//       if (err) throw err;
      
//       //JSON.stringify(res);
//       console.log(res);
//       connection.end();
//     });
//   };
    
    
    
    
    
    
    
    // inquirer
    //   .prompt({
    //     name: 'artist',
    //     type: 'input',
    //     message: 'What artist would you like to search for?',
    //   })
       //((answer) => {
        const query = 'SELECT id, first_name, last_name, role_id, manager_id  FROM employee '; // WHERE ? --USE FOR ADDING/SEARCHING
        // because viewing no need for where
        //console.log(query);
        //console.log(answer);
        connection.query(query, {action: first_name, last_name, role_id, manager_id },  (err, res) => { //might be null if no results...dummy emplyees required.
            console.log(answer);
            //console.log("test--------------");
            res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            console.log(
              `Position: ${id} ||  First Name: ${first_name} || Last_Name: ${last_name} || Role Id: ${role_id} || Manager Id: ${manager_id}`
            );
          });
          runSearch();
        });
     // });
  };
  runSearch();


  // Finish schema file, correct syntax etc