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
	console.log(`Successfully added department ${department.name}`)
}

async function addRole(){
	let department = await sql.getAllDepartments()
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
			choices: department.map(object => object.name)
		}
	])

	let departmentChoosen = department.filter(object => object.name == role.department)
	await sql.addRole(role.title, role.salary, departmentChoosen[0].id)
	console.log(`Successfully added role ${role.title}`)
}

async function addEmployee(){

}

async function updateRole(){

}