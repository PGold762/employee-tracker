# Employee Tracker

## Description

As a developer I would like a way to easily create and compile notes.

### User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation

Download the files from the repo and install locally. Be sure to install NPM, inquirer8.2.4, mysql, console.table. Then login to mysql using the following command: mysql -u root -p . Then source schema.sql. This will load the database. Then run server.js file in node to begin the application.

## Usage

This is an app local on your device that you may trigger within terminal and answer the questions

Link to video: [Employee Tracker](https://hidden-hollows-74969-d62c2e890e5e.herokuapp.com/)

Screenshot of App: 

![Employee Tracker](/employee-cap.png "Employee Tracker")

## Credits

* Worked with Tutor Andrew Tirpok

* Reviewed documentation for [MySQL2] (https://www.npmjs.com/package/mysql2)

## License

MIT License
