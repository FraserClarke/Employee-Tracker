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


    updateRole(empId, roleId){
		return this.connection.query("UPDATE employee SET roleId = ? WHERE id = ?",
			[])

	};

}

module.exports = new dbQuery(connection);