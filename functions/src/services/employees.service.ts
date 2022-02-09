import { Employee } from '../../../models/employee';
import { Dependent } from '../../../models/dependent';
import { environment } from '../environments/environment';
import { createPool } from 'promise-mysql';
import { readFileSync } from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

const connection = createPool(environment.db);

// TODO implement shortlist of employees based on characters passesed in
export const getEmployees = async(): Promise<Employee[]> => {
	const query = readFileSync(path.resolve(__dirname + '/../../../scripts/get-employees.sql')).toString();

	// Result is returned as a json object or Employees and their Dependents
	const result = await (await connection).query(query);

	const employees: Employee[] = await JSON.parse(result[0].employees);

	return employees;
}

export const createEmployee = async(employee: Employee): Promise<number> => {

	// TODO create a function to appropriately return the necessary values
	let values = [employee.FirstName, employee.LastName, employee.DOB, employee.Status]

	const result: OkPacket = await (await connection).query('INSERT INTO Employees (FirstName, LastName, DOB, Status) VALUES (?)', [values]);

	// TODO catch failed insert
	return result.insertId;
}

export const createDependent = async(dependent: Dependent): Promise<number> => {

	let values = [dependent.EmployeeId, dependent.FirstName, dependent.LastName]

	const result: OkPacket = await (await connection).query('INSERT INTO Dependents (EmployeeId, FirstName, LastName) VALUES (?)', [values]);

	return result.insertId;
}

// TODO add function to remove dependents
// export const deleteDependent = asnyc(): Promise<null | void> => {

// }
