import { Dependent } from "./dependent";
import { Person } from "./person";

export interface Employee extends Person{
	EmployeeId: number;
	DOB: Date;
	Status: string;
	Dependents?: Dependent[]
}
