const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const dbQuery = require("./db/markdown");
const connection = require("./db/connection")

// const connection = mysql.createConnection({
//   host: "localhost",

//   // Your port, if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'

//   // Be sure to update with your own MySQL password!
//   password: "password", // Incorrect password = Access denied error
//   database: "employee_db", // Make sure this is an existing database
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log(`connected as id ${connection.threadId}`);
//   //connection.end();
// });

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

async function employeeView () {
  let employees = await dbQuery.viewEmployees();
  console.table(employees);
  //   console.table(res);
  menuOptions();


  // connection.query("SELECT * FROM employee", (err, res) => {
  //   if (err) throw err;

  //   //JSON.stringify(res);
  //   //console.log(action.res);
  //   console.log(res);
  //   console.table(res);
  //   menuOptions();
  //   //connection.end();
  // });
};

const departmentsView = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    //JSON.stringify(res);
    //console.log(action.res);
    console.log(res);
    console.table(res);
    menuOptions();
    //connection.end();
  });
};

async function rolesView () {
    let roles = await dbQuery.viewRoles();
    console.table(roles);
    //   console.table(res);
    menuOptions();
}

// const rolesView = () => {
//   connection.query("SELECT * FROM role", (err, res) => {
//     if (err) throw err;

//     //JSON.stringify(res);
//     //console.log(action.res);
//     console.log(res);
//     console.table(res);
//     menuOptions();
//     //connection.end();
//   });
// };

const departmentsAdd = () => {
  inquirer
    .prompt({
      type: "input",
      name: "addDepartment",
      message: "Enter Department name:",
    })
    .then((data) => {
      console.log(data);
      //   const pushDepartment = new pushDepartment (
      //       data.addDepartment,
      //       //console.log(pushDepartment)
      //   )
      // console.log(pushDepartment);
      //INSERT INTO department SET ? data.addDepartment
      connection.query(
        `INSERT INTO department (name)VALUES ("${data.addDepartment}");`,
        (err, res) => {
          //data.addDepartment;
          //const pushDepartment = new pushDepartment
          if (err) throw err;

          //       //JSON.stringify(res);
          //       //console.log(action.res);
          console.log(data.addDepartment);
          console.log(res);
          console.table(res);
          departmentsView();

          menuOptions();
          //       //connection.end();
        }
      );
    });
};

const rolesAdd = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoleTitle",
        message: "Enter Title:",
      },
      {
        type: "input",
        name: "addRoleSalary",
        message: "Enter Salary:",
      },
      {
        type: "input",
        name: "addDeptId",
        message: "Enter Department ID:",
      },
    ]) //;}
    .then((data) => {
      console.log(data);
      //INSERT INTO department SET ? data.addRole
      connection.query(
        `INSERT INTO role (title, salary, department_id)
        VALUES ("${data.addRoleTitle}","${data.addRoleSalary}","${data.addDeptId}");`,
        (err, res) => {
          if (err) throw err;
          //       //JSON.stringify(res);
          console.log(res);
          console.table(res);
          rolesView();

          menuOptions();
        }
      );
    });
};

const employeeAdd = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addFirstName",
        message: "Enter First name:",
      },
      {
        type: "input",
        name: "addLastName",
        message: "Enter Last name:",
      },
      {
        type: "input",
        name: "addRoleId",
        message: "Enter Role ID:",
      },
      {
        type: "input",
        name: "addManagerId",
        message: "Enter Manager ID:",
      },
    ]) //};
    .then((data) => {
      console.log(data);
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${data.addFirstName}","${data.addLastName}","${data.addRoleId}","${data.addManagerId}");`,
        (err, res) => {
          if (err) throw err;
          //       //JSON.stringify(res);
          console.log(res);
          console.table(res);
          employeeView();

          menuOptions();
        }
      );
    });
};

async function employeeUpdateRoles() {
  let employees = await dbQuery.viewEmployees();
  // console.log(employees);
  let employeeList = employees.map((employee) => (
    {name: employee.first_name + " " + employee.last_name,
     value: employee.id
    }
  ))
  let roles = await dbQuery.viewRoles();
  // console.log(employees);
  let roleList = roles.map((role) => (
    {name: role.title + " " + role.salary + " " + role.department_id,
     value:role.id
    }
  ));
  //same as above for roleList

    console.log(employeeList);
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeSelection",
          message: "Which Employees role do you want to update?",
          choices: employeeList
        },
      ])
    //};
    .then((employee) => {
       let employeeId = employee.employeeSelection;
        console.log(employee);
        let roleId = employee.roleSelection;
        console.log(roleId);
        inquirer.prompt([
        {
          type: "list",
          name: "roleSelection",
          message: "Which Role do you want to update to?",
          choices: roleList
        },
      ]).
        then

        ((data) => {dbQuery.updateRole(data.roleSelection,employeeId)
          
      
            
            employeeView();
  
            menuOptions();
          }
        );
      });
  };
    // const updateProduct = () => {
    //     console.log('Updating all Rocky Road quantities...\n');
    //     const query = connection.query(
    //       'UPDATE products SET ? WHERE ?',
    //       [
    //         {
    //           quantity: 100,
    //         },
    //         {
    //           flavor: 'Rocky Road',
    //         },
    //       ],
    //       (err, res) => {
    //         if (err) throw err;
    //         console.log(`${res.affectedRows} products updated!\n`);
    //         // Call deleteProduct AFTER the UPDATE completes
    //         deleteProduct();
    //       }
    //     );

// first_name VARCHAR(30) NOT NULL,
// last_name VARCHAR(30) NOT NULL,
// role_id INT  ,
// manager_id INT  ,
//   const departmentsAdd = () => {
//     inquirer
//     .prompt(
//     {
//         type: "input",
//         name: "addDepartment",
//         message: "Enter Department name:",
//       },
//     ).then(data => {
//         console.log(data);
//     })
//     connection.query("INSERT INTO department SET ?",   (err, res) => {
//       if (err) throw err;

//       //JSON.stringify(res);
//       //console.log(action.res);
//       console.log(res);
//       console.table(res);
//       menuOptions();
//       //connection.end();
//     });
//   };

//   const createProduct = () => {
//     console.log('Inserting a new product...\n');
//     const query = connection.query(
//       'INSERT INTO products SET ?',
//       {
//         flavor: 'Rocky Road',
//         price: 3.0,
//         quantity: 50,
//       },
//       (err, res) => {
//         if (err) throw err;
//         console.log(`${res.affectedRows} product inserted!\n`);
//         // Call updateProduct AFTER the INSERT completes
//         updateProduct();
//       }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
//   };

// try this syntaxt
// var addNewProduct = _function_() {
//        inquirer.prompt([{
//                name: “product_Name”,
//                type: “input”,
//                message: “Please enter the name of your product:”
//            }, {
//                name: “dept_Name”,
//                type: “input”,
//                message: “Enter department name:”
//            }, {
//                name: “unit_price”,
//                type: “input”,
//                message: “Enter price for product:”
//            }, {
//                name: “units_InStock”,
//                type: “input”,
//                message: “Enter units in stock:”
//            }
//        ]).then(function_(_answers) {
//            connection.query(“INSERT INTO products SET ?“, {
//                productName: answers.product_Name,
//                deptName: answers.dept_Name,
//                unitPrice: answers.unit_price,
//                unitsInStock: answers.units_InStock
//            }, function_(_err, res) {
//                var newProd = new newProduct(answers.product_Name, answers.dept_name, answers.unit_price, answers.units_InStock);
//                console.log(newProd);
//                continueWorking();
//            });
//        })

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
};
//exitApp();
menuOptions();
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);
//     employeeView()

//});

// Finish schema file, correct syntax etc
