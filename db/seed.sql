-- initialise with dummmy data..test data.....
-- Eg emplyee names etc to understand how applicatioln works.

-- TEST SCENARIO seed.sql. 

INSERT INTO department (name)
VALUES 
('Custodial'),
('Information Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales'),
('Management');

INSERT INTO role (title, salary, department_id)
VALUES
('Intern', 25000, 1),
('Web Developer', 75000, 2),
('Accountant', 90000, 3),
('Paralegal', 50000, 4),
('Manager', 70000, 5),
('Engineer', 85000, 6),
('Sales Rep', 40000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Smith', 1, 458),
('Donald', 'Glover', 2, 276),
('Cameron', 'Miller', 3, 486),
('Maria', 'Hall', 4, 126),
('Linda', 'Blair', 5, 724),
('Melissa', 'Stewart', 6, 236),
('James', 'Cagney', 7, 169),
('Bruce', 'Buffer', 3, 452),
('Biff', 'Tannen', 2, 310),
('Micheal', 'Sommers', 6, 327),
('Ben', 'Danson', 1, 218),
('Stephen', 'Hutchens', 3, 644),
('Amy', 'Sheffield', 7, 788);