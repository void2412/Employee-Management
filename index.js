const cTable = require('console.table')
const sqlQuery = require('./sqlQuery')
const inquirer = require('inquirer')

const menuList = [
	'View All Departments', 
	'View All Roles', 
	'View All Employees',
	'Add Department',
	'Add Role',
	'Add Employee',
	'Update Role For Employee',
	'Quit'
	]

const sql = new sqlQuery()

async function mainMenu(){
	sql.connect()
	while(true){
		var userChoice = await inquirer.prompt({
			type:'list',
			name: 'choice',
			message: 'What do you want to do?',
			choices: menuList
		})

		switch(userChoice.choice){
			case menuList[0]: await viewAllDepartments(); break;
			case menuList[1]: await viewAllRoles(); break;
			case menuList[2]: await viewAllEmployees(); break;
			case menuList[3]: await addDepartment(); break;
			case menuList[4]: await addRole(); break;
			case menuList[5]: await addEmployee(); break;
			case menuList[6]: await updateRole(); break;
			case menuList[7]: sql.close(); return;
		}

	}
	
}
mainMenu()
async function viewAllDepartments(){
	console.table(await sql.getAllDepartments())
}

async function viewAllRoles(){
	console.table(await sql.getAllRoles())
}

async function viewAllEmployees(){
	console.table(await sql.getAllEmployees())
}

async function addDepartment(){
	let department = await inquirer.prompt({
		type:'input',
		message: 'Enter New Department Name: ',
		name: 'name'
	})

	await sql.addDepartment(department.name)
	console.log(`Added department ${department.name}`)
}

async function addRole(){
	let department = await sql.getAllDepartments()
	department.forEach(object => delete Object.assign(object, {['value']: object['id'] })['id'])
	department.unshift({value:null, name:'None'})
	let role = await inquirer.prompt([
		{
			type: 'input',
			name:'title',
			message: 'Enter New Role Name: '
		},
		{
			type: 'number',
			name:'salary',
			message: 'Enter New Salary: '
		},
		{
			type: 'list',
			name:'department',
			message: 'Choose a Department',
			choices: department
		}
	])

	await sql.addRole(role.title, role.salary, role.department)
	console.log(`Added role ${role.title}`)
}

async function addEmployee(){
	let employeeList = await sql.customQuery(`select id as value, concat(first_name, ' ', last_name) as name from employee order by id`)
	employeeList.unshift({value:null, name:"None"})
	let roleList = await sql.customQuery(`select id as value, title as name from role order by id`)
	roleList.unshift({value:null, name:'None'})
	let employee = await inquirer.prompt([
		{
			type: 'input',
			name:'firstName',
			message: 'Enter New Employee First Name: '
		},
		{
			type: 'input',
			name:'lastName',
			message: 'Enter New Employee Last Name: '
		},
		{
			type: 'list',
			name:'role',
			message: 'Choose a role',
			choices: roleList
		},
		{
			type: 'list',
			name:'manager',
			message: 'Choose a manager',
			choices: employeeList
		}
	])

	await sql.addEmployee(employee.firstName, employee.lastName, employee.role, employee.manager)
	console.log(`Added ${employee.firstName} ${employee.lastName}`)
}

async function updateRole(){
	let employeeList = await sql.customQuery(`select id as value, concat(first_name, ' ', last_name) as name from employee order by id`)
	let roleList = await sql.customQuery(`select id as value, title as name from role order by id`)

	let employee = await inquirer.prompt([
		{
			type: 'list',
			message: 'Choose employee to update role',
			name: 'employee',
			choices: employeeList
		},
		{
			type: 'list',
			message: 'Choose a role to update',
			name: 'role',
			choices: roleList
		}
	])

	await sql.updateEmployeeRole(employee.employee, employee.role)
	console.log(`Role updated`)
}