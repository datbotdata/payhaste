import { Person } from "./person";

export interface Dependent extends Person {
	EmployeeId: number;
	DependentId: number;
	Spouse: boolean;
}
