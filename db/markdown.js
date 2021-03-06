const connection = require("./connection");

class dbQuery {
	constructor(connection) {
		this.connection = connection;
	};

    viewEmployees(){

		return this.connection.query("SELECT * FROM employee")

	};
    viewRoles(){

		return this.connection.query("SELECT * FROM role")

	};


    updateRole(roleId,employeeId){ //pass into array
		return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?",//first , then second
			[roleId, employeeId])

	};

}

module.exports = new dbQuery(connection);