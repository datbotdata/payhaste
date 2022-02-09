CREATE TABLE IF NOT EXISTS Employees (
	EmployeeId int NOT NULL AUTO_INCREMENT,
    FirstName varchar(25) NOT NULL,
    LastName varchar(25) NOT NULL,
    DOB date NOT NULL,
    Status varchar(25) NOT NULL,
    PRIMARY KEY (EmployeeId)
);


CREATE TABLE IF NOT EXISTS Dependents (
	DependentId int NOT NULL AUTO_INCREMENT,
    EmployeeId int NOT NULL,
    FirstName varchar(25) NOT NULL,
    LastName varchar(25) NOT NULL,
    Spouse bit NOT NULL,
	PRIMARY KEY (DependentId)
);