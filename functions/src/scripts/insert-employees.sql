INSERT INTO Employees (FirstName, LastName, DOB, Status)
VALUES
('Tony', 'Stark', str_to_date('1970-05-27 00:00:00', '%Y-%m-%d'),'Active'),
('Natasha', 'Romanoff', str_to_date('1970-05-27', '%Y-%m-%d'), 'Terminated'),
('Wanda', 'Maximoff', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Wade', 'Wilson', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Peter', 'Parker', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active'),
('Agatha', 'Harkness', str_to_date('1970-05-27', '%Y-%m-%d'), 'Active');