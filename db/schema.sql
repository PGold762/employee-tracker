DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY,
  job_title VARCHAR(20) NOT NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);

INSERT INTO departments (name)
VALUES
    ('CEO')
    ('Sales')
    ('Dev')
    ('HR');

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ('CEO/Owner', 150000, 1)
    ('Sales Representative', 95000, 2)
    ('Full Stack Developer', 90000, 3)
    ('Human Resources', 80000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jon', 'Picard', 1, null),
    ('William', 'Ryker', 2, 1)
    ('George', 'Leforge', 3, 1)
    ('Wesley', 'Crusher', 3, 3)
    ('Jim', 'Kirk', 4, 1)
    ('Scott', 'Montgomery', 3, 3)
    ('Chris', 'Pike', 2, 2)
    ('Beckette', 'Mariner', 2, 2);

