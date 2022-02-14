import { Benefits } from '../../../models/benefits';
import { Employee } from '../../../models/employee';
import { Dependent } from '../../../models/dependent';
import { environment } from '../environments/environment';
import { createPool } from 'promise-mysql';
import { readFileSync } from 'fs';
import path from 'path';
import { OkPacket } from 'mysql';

// Define connection with environment variables
const _connection = createPool(environment.db);

// TODO benefit values should be stored in a table and employeers should be able to modify these values
// Benefit static values
const _discountLetter = 'a';
const _discountMultiplier =  1 - 10/100;
const _costPerEmployee = 1000;
const _constPerDependent = 500;
const _discountPerEmployee = 1000 * _discountMultiplier;
const _discountPerDependent = 500 * _discountMultiplier;

export const getAll = async(): Promise<Benefits> => {
	const employees = await getEmployees();
	let benefits = await _calculateTotalCost(employees);

	return benefits;
}

// TODO implement shortlist of employees based on characters passesed in
export const getEmployees = async(): Promise<Employee[]> => {
	const query = readFileSync(path.resolve(__dirname + '/../../../scripts/get-employees.sql')).toString();

	// MySQL supports returning nested JSON objects, the query will return employees and their dependents
	const result = await (await _connection).query(query);

	const employees: Employee[] = await JSON.parse(result[0].employees);

	return employees;
}

export const resetEmployees = async(): Promise<Employee[]> => {
	const employeeQuery = readFileSync(path.resolve(__dirname + '/../../../scripts/insert-employees.sql')).toString();
	const dependentQuery = readFileSync(path.resolve(__dirname + '/../../../scripts/insert-dependents.sql')).toString();

	// Truncate tables
	await (await _connection).query('TRUNCATE TABLE Employees');
	await (await _connection).query('TRUNCATE TABLE Dependents');

	// Insert employees and dependents
	const employeeResult = await (await _connection).query(employeeQuery);
	await (await _connection).query(dependentQuery);

	return employeeResult;
}

export const createEmployee = async(employee: Employee): Promise<number> => {
	let values = [employee.FirstName, employee.LastName, employee.DOB, employee.Status]

	const result: OkPacket = await (await _connection).query('INSERT INTO Employees (FirstName, LastName, DOB, Status) VALUES (?)', [values]);

	// TODO catch failed insert
	return result.insertId;
}

export const createDependent = async(dependent: Dependent): Promise<number> => {
	let values = [dependent.EmployeeId, dependent.FirstName, dependent.LastName]

	const result: OkPacket = await (await _connection).query('INSERT INTO Dependents (EmployeeId, FirstName, LastName) VALUES (?)', [values]);

	return result.insertId;
}

export const removeDependent = async(dependentId: number): Promise<number> => {
	const result: OkPacket = await (await _connection).query('DELETE FROM Dependents WHERE  DependentId = ?', dependentId);

	return result.insertId;
}

// Calculate the total cost of benefits and discounts for all active employees
async function _calculateTotalCost(employees: Employee[]): Promise<Benefits> {
	let totalDependents = 0;
	let discountedDependents = 0;

	// Filter for active employees to determine the current cost
	let activeEmployees = employees.filter(employee => employee.Status == 'Active');
	// Get the number of active employees with a first name starting with the discountLetter
	let discountedEmployeesCount = activeEmployees.filter((employee) => employee.FirstName.toLowerCase().startsWith(_discountLetter)).length;
	// Use the discountedEmployeesCount against the activeEmployees count to determine the cost for all employees
	let totalEmployeeCost = (discountedEmployeesCount * _discountPerEmployee) + ((activeEmployees.length - discountedEmployeesCount) * _costPerEmployee);

	// Get total number of depenents and discounted dependents
	for (let employee of activeEmployees) {
		if (employee.Dependents) {
			totalDependents = totalDependents + (employee.Dependents ? employee.Dependents.length : 0);
			discountedDependents = discountedDependents + employee.Dependents.filter((dependent) => dependent.FirstName.toLowerCase().startsWith(_discountLetter)).length;
		}
	}

	let totalDependentCost = (discountedDependents * _discountPerDependent) + ((totalDependents - discountedDependents) * _constPerDependent);

	let benefits: Benefits = {
		Employees: employees,
		ActiveEmployees: activeEmployees.length,
		ActiveDependents: totalDependents,
		TotalCost: totalEmployeeCost + totalDependentCost
	};

	return benefits;
}