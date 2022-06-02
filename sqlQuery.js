const mysql = require('mysql2')
const cTable = require('console.table')
require('dotenv').config()
class sqlQuery {
	constructor(){
		this.host = process.env.host
		this.user = process.env.user
		this.password = process.env.password
		this.database = process.env.database
		this.connection
	}

	connect(){
		this.connection = mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database
		}, console.log('Database connected success.'));
	}

	viewAllDepartments(){
		this.connection.query(`select * from department`, (err, result) => err ? console.log(err): console.table(result))
	}

	viewAllRoles(){
		this.connection.query(`select id, title as name from role`, (err, result) => err ? console.log(err): console.table(result))
	}

	viewAllEmployees(){
		this.connection.query(`select t1.id, t1.first_name, t1.last_name, role.title, department.name, concat(t2.first_name,' ', t2.last_name) as manager from employee t1
		join role on t1.role_id = role.id
		join department on role.department_id = department.id
		left join employee t2 on t1.manager_id = t2.id
		order by t1.id`, (err, result) => err ? console.log(err): console.table(result))
	}

	addDepartment(){

	}

	addRole(){
		
	}

	addEmployee(){

	}

	updateEmployeeRole(){
		
	}
}


module.exports = sqlQuery