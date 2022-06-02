const mysql = require('mysql2')
const cTable = require('console.table')
require('dotenv').config()
class sqlQuery {
	constructor(){
		this.host = process.env.host
		this.user = process.env.user
		this.password = process.env.password
		this.database = process.env.database
		this.returnedDepartements=[]
		this.returnedRoles=[]
		this.returnedEmployees=[]
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

	async getAllDepartments(){
		let data = await this.connection.promise().query(`select * from department`)
		return data[0]
	}

	async getAllRoles(){
		let data = await this.connection.promise().query(`select id, title as name from role`)
		return data[0]
	}

	async getAllEmployees(){
		let data = await this.connection.promise().query(`select t1.id, t1.first_name, t1.last_name, role.title, department.name, concat(t2.first_name,' ', t2.last_name) as manager from employee t1
		join role on t1.role_id = role.id
		join department on role.department_id = department.id
		left join employee t2 on t1.manager_id = t2.id
		order by t1.id`)
		return data[0]
	}

	addDepartment(name){

	}

	addRole(name, salary, departmentId){
		
	}

	addEmployee(firstName, lastName, roleId, managerId){

	}

	updateEmployeeRole(employeeId, roleId){
		
	}
}


module.exports = sqlQuery