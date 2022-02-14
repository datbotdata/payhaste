import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Employee } from 'models/employee';
import { EmployeeService } from './employee.service';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

describe('EmployeeService', () => {
	let service: EmployeeService;
	let employeeService: SpyObj<EmployeeService>;
	const mockEmployee: Employee[] = [{
		EmployeeId: 1,
		FirstName: 'Tony',
		LastName: 'Stark',
		DOB: new Date('1970-05-27'),
		Status: 'Active',
		Dependents: [
			{
				DependentId: 1,
				EmployeeId: 1,
				FirstName: 'Pepper',
				LastName: 'Pots',
				Spouse: true
			}
		]
	}];

	beforeEach(() => {
		employeeService = createSpyObj(EmployeeService, ['getEmployees']);
		employeeService.getEmployees.and.returnValue(of(mockEmployee));
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});
		service = TestBed.inject(EmployeeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get employees', (done) => {
		console.log(service);
		employeeService.getEmployees().subscribe((employees) => {
			expect(employees).toBe(mockEmployee);
			expect(employeeService.getEmployees).toHaveBeenCalled();
			done();
		});
	});
});
