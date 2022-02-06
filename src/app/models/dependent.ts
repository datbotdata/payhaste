import { Person } from "./person";

export interface Dependent extends Person {
	spouse: boolean;
}
