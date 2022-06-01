const mysql = require('mysql2');

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
}