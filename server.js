// Import and require mysql2, inquirer, console.table
const inquirer = require('inquirer');
const mysql = require('mysql2');
require (console.table);

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp(); // Start the application after connecting to the database
});