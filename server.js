// Import and require mysql2, inquirer, console.table
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hZlNg3sX$nRXs05UnhqPn',
  database: 'company_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp(); // Start the application after connecting to the database
});

// First Question Choose 
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Close application', // Add this option
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Close application':
          console.log('Closing the application.');
          closeConnection(); // Close the database connection and exit
          break;
        default:
          connection.end(); // Close the database connection and exit the application
      }
    })
    .catch((error) => {
      console.error(error);
      connection.end(); // Close the database connection and exit the application
    });
}
// Function to View All Departments
function viewAllDepartments() {
  // Execute a SQL query to retrieve all departments and display them
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Return to the main menu after viewing departments
  });
}

// Function to View All Roles
function viewAllRoles() {
  // Execute a SQL query to retrieve all roles and their details
  const query = `
    SELECT roles.id, roles.job_title, roles.salary, departments.name AS department
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;

    // Display the roles in a formatted table
    console.log('\nAll Roles:\n');
    console.table(results);

    startApp(); // Return to the main menu after viewing roles
  });
}

// Function to View All Employees
function viewAllEmployees() {
  // Execute a SQL query to retrieve all employees and their details
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, roles.salary, 
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name, departments.name AS department
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    LEFT JOIN departments ON roles.department_id = departments.id
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;

    // Display the employees in a formatted table
    console.log('\nAll Employees:\n');
    console.table(results);

    startApp(); // Return to the main menu after viewing employees
  });
}

// Function to Add New Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: function (value) {
          if (value.trim() === '') {
            return 'Please enter a department name.';
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      // Execute a SQL query to insert the new department into the database
      const query = 'INSERT INTO departments (name) VALUES (?)';

      connection.query(query, [answers.departmentName], (err, result) => {
        if (err) throw err;

        console.log(`\nNew department "${answers.departmentName}" has been added.`);
        startApp(); // Return to the main menu after adding the department
      });
    })
    .catch((error) => {
      console.error(error);
      startApp(); // Return to the main menu on error
    });
}

// Function to Add New Role
function addRole() {
  // Fetch the list of departments from the database
  const departmentQuery = 'SELECT id, name FROM departments';

  connection.query(departmentQuery, (err, departments) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'jobTitle',
          message: 'Enter the job title for the new role:',
          validate: function (value) {
            if (value.trim() === '') {
              return 'Please enter a job title.';
            }
            return true;
          },
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary for the new role:',
          validate: function (value) {
            if (isNaN(value) || value <= 0) {
              return 'Please enter a valid salary (a positive number).';
            }
            return true;
          },
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for this role:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        // Insert the new role into the roles table with the selected department
        const insertQuery =
          'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)';

        connection.query(
          insertQuery,
          [answers.jobTitle, answers.salary, answers.departmentId],
          (err, result) => {
            if (err) throw err;

            console.log(`\nNew role "${answers.jobTitle}" has been added to department.`);
            startApp(); // Return to the main menu after adding the role
          }
        );
      })
      .catch((error) => {
        console.error(error);
        startApp(); // Return to the main menu on error
      });
  });
}


// Function to Add Employee
function addEmployee() {
  // Grab the list of existing roles and employees from the database
  const roleQuery = 'SELECT id, job_title FROM roles';
  const employeeQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';

  connection.query(roleQuery, (err, roles) => {
    if (err) throw err;

    connection.query(employeeQuery, (err, employees) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee:',
            validate: function (value) {
              if (value.trim() === '') {
                return 'Please enter a first name.';
              }
              return true;
            },
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee:',
            validate: function (value) {
              if (value.trim() === '') {
                return 'Please enter a last name.';
              }
              return true;
            },
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the role for the new employee:',
            choices: roles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the manager for the new employee (or None for no manager):',
            choices: [{ name: 'None', value: null }].concat(
              employees.map((employee) => ({
                name: employee.name,
                value: employee.id,
              }))
            ),
          },
        ])
        .then((answers) => {
          // Insert the new employee into the employees table
          const insertQuery =
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

          connection.query(
            insertQuery,
            [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
            (err, result) => {
              if (err) throw err;

              console.log(`\nNew employee "${answers.firstName} ${answers.lastName}" has been added.`);
              startApp(); // Return to the main menu after adding the employee
            }
          );
        })
        .catch((error) => {
          console.error(error);
          startApp(); // Return to the main menu on error
        });
    });
  });
}

// Function to Update EmployeeRole
function updateEmployeeRole() {
  // Get the list of existing employees and roles from the database
  const employeeQuery =
    'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
  const roleQuery = 'SELECT id, job_title FROM roles';

  connection.query(employeeQuery, (err, employees) => {
    if (err) throw err;

    connection.query(roleQuery, (err, roles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee whose role you want to update:',
            choices: employees.map((employee) => ({
              name: employee.name,
              value: employee.id,
            })),
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
        ])
        .then((answers) => {
          // Update the employee's role in the employees table
          const updateQuery = 'UPDATE employees SET role_id = ? WHERE id = ?';

          connection.query(
            updateQuery,
            [answers.roleId, answers.employeeId],
            (err, result) => {
              if (err) throw err;

              console.log(
                `\nEmployee's role has been updated to the new role (ID: ${answers.roleId}).`
              );
              startApp(); // Return to the main menu after updating the role
            }
          );
        })
        .catch((error) => {
          console.error(error);
          startApp(); // Return to the main menu on error
        });
    });
  });
}



// Close connections once application is done
function closeConnection() {
  connection.end();
}