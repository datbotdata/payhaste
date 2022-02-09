import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faEdit, faPlus, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';
import { AddPersonComponent } from '../dialogs/add-person/add-person.component';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { Employee } from '../../../models/employee';
import { PersonType } from '../../../models/person-type';
import { EmployeeService } from '../service/employee.service';

@Component({
	selector: 'app-benefits',
	templateUrl: './benefits.component.html',
	styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

	constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
		this._getEmployees();
	}

	// Icons
	faPlus = faPlus;
	faSearch = faSearch;
	faEdit = faEdit;
	faX = faTimesCircle;

	employeeControl = new FormControl();
	PersonType = PersonType;

	// Benefits cost variables
	discountLetter = 'a';
	discountMultiplier =  1 - 10/100;
	employeeCost = 0;
	employeeTakeHome = 0;
	private costPerEmployee = 1000;
	private constPerDependent = 500;
	private discountPerEmployee = 1000 * this.discountMultiplier;
	private discountPerDependent = 500 * this.discountMultiplier;
	private paycheckAmount = 2000;
	totalActiveEmployees = 0;
	totalDependents = 0;
	totalCost = 0;

	employee: Employee | undefined;

	employees!: Employee[];

	filteredEmployees: Observable<Employee[]> | undefined;

	// Get all employees
	private _getEmployees(employeeId?: number): void {
		this.employeeService.getEmployees().subscribe((data: Employee[]) => {
			this.employees = data;
			this.filteredEmployees = this.employeeControl.valueChanges.pipe(
				startWith(''),
				map(value => (typeof value === 'string' ? value : null)),
				map(name => (name ? this._filter(name) : this.employees.slice())),
			);
			this._sortEmployees();
			this._calculateTotalCost();

			// Update the selected employee
			if (employeeId) {
				this.resetSearch();
				this.employee = this.employees.find(employee => employee.EmployeeId == employeeId);
				this._calculateEmployeeCost();
			}
		});
	}

	// Dialogs
	openAddPerson(personType: PersonType): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.data = {
			personType: personType
		}

		const dialogRef = this.dialog.open(AddPersonComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(data => {
			if (personType == PersonType.employee && data) {
				this.employeeService.createEmployee(data).subscribe(employeeId => {
					this._getEmployees(employeeId);
				});
			} else if (personType == PersonType.dependent && data) {
				data.EmployeeId = this.employee?.EmployeeId;
				this.employeeService.createDependent(data).subscribe(dependentId => {
					this._getEmployees(data.EmployeeId);
				});
			}
		});
	}

	removeDependent(index: number): void {
		const dialogRef = this.dialog.open(ConfirmComponent);

		dialogRef.afterClosed().subscribe(data => {
			if (data && this.employee) {
				this.employee.Dependents?.splice(index, 1);
				this._calculateEmployeeCost();
			}
		});
	}

	// Form control functions
	// Handles how employee is displayed in the autocomplete field
	displayFn(employee: Employee): string {
		return employee && employee.FirstName && employee.LastName ? `${employee.FirstName} ${employee.LastName}` : '';
	}

	// Set selected employee
	selectEmployee(event: MatAutocompleteSelectedEvent): void {
		this.employee = event.option.value;
		this.employeeCost = 0;
		this.employeeTakeHome = 0;
		this._calculateEmployeeCost();
	}

	// Clear search
	resetSearch(): void {
		this.employeeControl.reset();
		this.employee = undefined;
	}

	// Filter employees by the employee control value (name)
	// Will accept first name, last name, or both
	private _filter(name: string): Employee[] {
		const filterValue = name.toLowerCase();

		this._sortEmployees();

		// To allow for first name and last name (with spaces) the space is required in the literal string
		return this.employees.filter(employee => `${employee.FirstName} ${employee.LastName}`.toLowerCase().includes(filterValue));
	}

	// Sory employees alphabetically by first name + last name
	private _sortEmployees(): void {
		this.employees.sort((a, b) => {
			let firstNameA = `${a.FirstName}${a.LastName}`.toLowerCase();
			let firstNameB = `${b.FirstName}${b.LastName}`.toLowerCase();

			if (firstNameA < firstNameB) {
				return -1;
			}

			if (firstNameA > firstNameB) {
				return 1;
			}

			return 0;

		});
	}

	// TODO these calculations may be fine on the frontend with a small list of employees but will see performance hits with larger datasets
	// Calculations
	// Calculate cost for the current employee
	private _calculateEmployeeCost(): void {
		if (this.employee) {
			let cost = this.employee.FirstName.toLowerCase().startsWith(this.discountLetter) ? this.discountPerEmployee : this.costPerEmployee;

			// If there are dependents, calculate the cost
			if (this.employee.Dependents && this.employee.Dependents?.length > 0 ) {
				let discountedDependents = this.employee.Dependents.filter((dependent) => dependent.FirstName.toLowerCase().startsWith(this.discountLetter)).length;

				// We already filtered through the dependents, get the remaining
				let remainingDependents = this.employee.Dependents.length - discountedDependents;

				// Combine dependent costs to employee costs
				cost = cost + (discountedDependents * this.discountPerDependent) + (remainingDependents * this.constPerDependent);
			}

			this.employeeCost = cost;

			// Round to two decimal places, total paycheck amount for the year - total employee cost divided by 26 paychecks
			this.employeeTakeHome = Math.round((((26 * this.paycheckAmount) - this.employeeCost) / 26) * 100) / 100;

			this._calculateTotalCost();
		}
	}

	// Calculate the total cost of benefits and discounts
	private _calculateTotalCost(): void {
		let activeEmployees = this.employees.filter(employee => employee.Status == 'Active');
		let discountedEmployees = activeEmployees.filter((employee) => employee.FirstName.toLowerCase().startsWith(this.discountLetter)).length;
		let totalDependents = 0;
		let discountedDependents = 0;

		let totalEmployeeCost = (discountedEmployees * this.discountPerEmployee) + ((activeEmployees.length - discountedEmployees) * this.costPerEmployee);

		// Get total number of depenents and discounted dependents
		for (let employee of activeEmployees) {
			if (employee.Dependents) {
				totalDependents = totalDependents + (employee.Dependents ? employee.Dependents.length : 0);
				discountedDependents = discountedDependents + employee.Dependents.filter((dependent) => dependent.FirstName.toLowerCase().startsWith(this.discountLetter)).length;
			}
		}

		let totalDependentCost = (discountedDependents * this.discountPerDependent) + ((totalDependents - discountedDependents) * this.constPerDependent);
		this.totalActiveEmployees = activeEmployees.length;
		this.totalDependents = totalDependents;
		this.totalCost = totalEmployeeCost + totalDependentCost;
	}

	ngOnInit(): void { }
}
