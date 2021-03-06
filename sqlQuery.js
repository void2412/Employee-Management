const mysql = require('mysql2')

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
		let data = await this.connection.promise().query(`
		select r.id as id, title as name, department.name as department, salary 
		from role r
		left join department on r.department_id = department.id
		order by department.name
		`
		)
		return data[0]
	}

	async getAllEmployees(){
		let data = await this.connection.promise().query(`select t1.id, t1.first_name, t1.last_name, role.title, department.name, concat(t2.first_name,' ', t2.last_name) as manager from employee t1
		left join role on t1.role_id = role.id
		left join department on role.department_id = department.id
		left join employee t2 on t1.manager_id = t2.id
		order by t1.id`)
		return data[0]
	}

	async customQuery(queryString){
		let data = await this.connection.promise().query(queryString)
		return data[0]
	}

	addDepartment(name){
		this.connection.query(`INSERT INTO department(name) VALUES (?);`, name, (err, result)=>{
			err ? console.error(err) : true
		})
	}

	addRole(name, salary, departmentId){
		this.connection.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`,[name, salary, departmentId], (err, result)=>{
			err ? console.error(err) : true
		})
	}

	addEmployee(firstName, lastName, roleId, managerId){
		this.connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,[firstName, lastName, roleId, managerId], (err, result)=>{
			err ? console.error(err) : true
		})
	}

	updateEmployeeRole(employeeId, roleId){
		this.connection.query(`UPDATE employee 
		SET role_id = ?
		WHERE id = ?`, [roleId, employeeId], (err, result)=>{
			err ? console.error(err) : true
		})
	}

	close(){
		this.connection.end()
	}
}

module.exports = sqlQuery