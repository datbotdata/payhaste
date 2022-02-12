import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employee } from 'models/employee';
import { Dependent } from 'models/dependent';
import { Benefits } from 'models/benefits';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	constructor(private http: HttpClient) { }

	private apiUrl = environment.api;

	getAll() {
		return this.http.get<Benefits>(`${this.apiUrl}/employee/all`)
	}

	getEmployees() {
		return this.http.get<Employee[]>(`${this.apiUrl}/employee`)
	}

	createEmployee(employee: Employee) {
		return this.http.post<number>(`${this.apiUrl}/employee`, employee)
	}

	createDependent(dependent: Dependent) {
		return this.http.post<number>(`${this.apiUrl}/employee/dependent`, dependent)
	}

	removeDependent(dependentId: number) {
		return this.http.delete<number>(`${this.apiUrl}/employee/dependent/${dependentId}`)
	}

	resetEmployees() {
		return this.http.delete<number>(`${this.apiUrl}/employee/reset`)
	}
}
