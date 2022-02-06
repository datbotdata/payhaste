import { Person } from "./person";

export interface Employee extends Person{
	status: string;
}
