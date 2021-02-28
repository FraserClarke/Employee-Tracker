const util = require("util");
const mysql = require("mysql");

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
  
  connection.connect();
  
  connection.query = util.promisify(connection.query);