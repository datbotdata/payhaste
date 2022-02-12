import { Employee } from "./employee";

export interface Benefits {
	Employees: Employee[];
	ActiveEmployees: number;
	ActiveDependents: number;
	TotalCost: number;
}