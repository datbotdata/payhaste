import { Employee } from '../../../models/employee';
import { Dependent } from '../../../models/dependent';
import * as employeesJson from '../../../src/assets/employees.json';

export const getAll = async(): Promise<Employee[]> => {
	console.log(Object.values(employeesJson));
	return Object.values(employeesJson);
}

// export const createEmployee = async(): Promise<Employee> => {

// }

// export const createDependent = async(): Promise<Dependent> => {

// }

// export const deleteDependent = asnyc(): Promise<null | void> => {

// }
