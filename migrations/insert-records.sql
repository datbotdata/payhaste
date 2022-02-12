TRUNCATE TABLE Employees;
INSERT INTO Employees (FirstName, LastName, DOB, Status)
VALUES
('Tony', 'Stark', str_to_date('1970-05-27 00:00:00', '%Y-%m-%d'),'Active'),
('Natasha', 'Romanoff', str_to_date('1970-05-27', '%Y-%m-%d'), 'Terminated'),
('Wanda', 'Maximoff', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Wade', 'Wilson', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Peter', 'Parker', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Agatha', 'Harkness', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active');

TRUNCATE TABLE Dependents;
INSERT INTO Dependents (EmployeeId, FirstName, LastName, Spouse)
VALUES
(1, 'Pepper', 'Pots', 1),
(1, 'Morgan', 'Stark', 0),
(1, 'Harley', 'Keener', 0),
(3, 'Billy', 'Maximoff', 0),
(3, 'Tommy', 'Maximoff', 0),
(4, 'Eleanor', 'Camacho', 0),
(6, 'Abilash', 'Tandon', 0);