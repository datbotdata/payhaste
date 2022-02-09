import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employee } from 'models/employee';
import { Dependent } from 'models/dependent';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	constructor(private http: HttpClient) { }

	private apiUrl = environment.api;

	getEmployees() {
		return this.http.get<Employee[]>(`${this.apiUrl}/employee`)
	}

	createEmployee(employee: Employee) {
		return this.http.post<number>(`${this.apiUrl}/employee`, employee)
	}

	createDependent(dependent: Dependent) {
		return this.http.post<number>(`${this.apiUrl}/employee/dependent`, dependent)
	}
}
