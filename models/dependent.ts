import { Person } from "./person";

export interface Dependent extends Person {
	EmployeeId: number;
	Spouse: boolean;
}
