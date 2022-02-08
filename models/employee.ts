import { Dependent } from "./dependent";
import { Person } from "./person";

export interface Employee extends Person{
	dob: Date;
	status: string;
	dependents?: Dependent[]
}
