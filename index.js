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

async function mainMenu(){
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
			case menuList[7]: return;
		}
	}
	
}
mainMenu()
async function viewAllDepartments(){

}

async function viewAllRoles(){

}

async function viewAllEmployees(){

}

async function addDepartment(){

}

async function addRole(){

}

async function addEmployee(){

}

async function updateRole(){

}