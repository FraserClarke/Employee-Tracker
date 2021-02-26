const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: "root",

  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'

  // Be sure to update with your own MySQL password!
  password: "password", // Incorrect password = Access denied error
  database: "employee_db", // Make sure this is an existing database
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  //connection.end();
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

const menuOptions = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Exit",
        "View Departments",
        "View Employees",
        "View Roles",

        "Add Departments",
        "Add Roles",
        "Add Employees",

        "Update Employee Roles",
        // Optional
        "Update employee managers",
        "View employees by manager",

        "Delete departments",
        "Delete roles",
        "Delete employees",

        "View Budget for specific department",
      ],
    })
    .then((res) => {
      let action = res.action;
      switch (
        action //choice.action
      ) { 
        //VIEW
        case "View Employees":
          console.log(action);
          employeeView();
          break;
        case "View Departments":
          console.log(action);
          departmentsView();
          break;
        case "View Roles":
          console.log(action);
          rolesView();
          break;
        //ADD
        case "Add Departments":
          console.log(action);
          departmentsAdd();
          break;
        case "Add Roles":
          console.log(action);
          rolesAdd();
          break;
        case "Add Employees":
          console.log(action);
          employeeAdd();
          break;
        //UPDATE
        case "Update Employee Roles":
          console.log(action);
          employeeUpdateRoles();
          break;
        //Optional
          case "Update employee managers":
          console.log(action);
          updateEmpManagers();
          break;
          case "View employees by manager":
          console.log(action);
          viewEmpByManager();
          break;

          case "Delete departments":
          console.log(action);
          deleteDepartments();
          break;
          case "Delete roles":
          console.log(action);
          deleteRoles();
          break;
          case "Delete employees":
          console.log(action);
          deleteeEmployees();
          break;
          
          case "View Budget for specific department":
          console.log(action);
          viewBudget();
          break;

          //Exit
        case "Exit Application":
            console.log(action);
            exitApp();
            break;

        // .then((answer) => {
        //     switch (answer.action) {
        //       case 'View Employees':
        //         employeeView();
        //         break;

        default:
          console.log(`Action: ${action}`);
          break;
      }
      // })
    });

  // .then(res => {
  //     Stuff
  //     }
  //     }
  //     )}
};
// const employeeView = () => {

//     const query =
//     'SELECT * FROM employee ;
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     runSearch();
//   });
// };

const employeeView = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    //JSON.stringify(res);
    //console.log(action.res);
    console.log(res);
    menuOptions();
    //connection.end();
  });
};

// inquirer
//   .prompt({
//     name: 'artist',
//     type: 'input',
//     message: 'What artist would you like to search for?',
//   })
//((answer) => {
//const query = 'SELECT id, first_name, last_name, role_id, manager_id  FROM employee '; // WHERE ? --USE FOR ADDING/SEARCHING
// because viewing no need for where
//console.log(query);
//console.log(answer);
//connection.query(query, {action: first_name, last_name, role_id, manager_id },  (err, res) => { //might be null if no results...dummy emplyees required.
//console.log(answer);
//console.log("test--------------");
//res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
// console.log(
//  `Position: ${id} ||  First Name: ${first_name} || Last_Name: ${last_name} || Role Id: ${role_id} || Manager Id: ${manager_id}`
// );
// });
//  runSearch();
//  });
// });
// };
// exitApp()  =>{
//     connection.end();  
// }
 const exitApp = () => {
    connection.end();
    }
    //exitApp();
menuOptions();
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);
//     employeeView()

//});

// Finish schema file, correct syntax etc
