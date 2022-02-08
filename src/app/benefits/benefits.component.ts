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
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-benefits',
	templateUrl: './benefits.component.html',
	styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

	constructor(private httpClient: HttpClient, public dialog: MatDialog) {
		this.httpClient.get<Employee[]>('assets/employees.json').subscribe((data: Employee[]) => {
			this.employees = data;
			this.filteredEmployees = this.employeeControl.valueChanges.pipe(
				startWith(''),
				map(value => (typeof value === 'string' ? value : null)),
				map(name => (name ? this._filter(name) : this.employees.slice())),
			);
			this.sortEmployees();
			this._calculateTotalCost();
		});
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

	ngOnInit(): void { }

	// Open a dialog to create a new person
	openAddPerson(personType: PersonType): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.data = {
			personType: personType
		}

		const dialogRef = this.dialog.open(AddPersonComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(data => {
			if (personType == PersonType.employee && data) {
				this.employees.push(data);
				this.resetSearch();
				this.employee = data;
				this._calculateEmployeeCost(data);
			} else if (personType == PersonType.dependent && data) {
				if (this.employee?.dependents) {
					this.employee.dependents.push(data);
					this._calculateEmployeeCost(this.employee);
				} else if (this.employee) {
					console.log(this.employee);
					this.employee.dependents = [data];
					this._calculateEmployeeCost(this.employee);
				}
			}
		});
	}

	removeDependent(index: number): void {
		const dialogRef = this.dialog.open(ConfirmComponent);

		dialogRef.afterClosed().subscribe(data => {
			if (data && this.employee) {
				this.employee.dependents?.splice(index, 1);
				this._calculateEmployeeCost(this.employee);
			}
		});
	}

	// Handles how employee is displayed in the autocomplete field
	displayFn(employee: Employee): string {
		return employee && employee.firstName && employee.lastName ? `${employee.firstName} ${employee.lastName}` : '';
	}

	// Set selected employee
	selectEmployee(event: MatAutocompleteSelectedEvent): void {
		this.employee = event.option.value;
		this.employeeCost = 0;
		this.employeeTakeHome = 0;
		this._calculateEmployeeCost(event.option.value);
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

		this.sortEmployees();

		// To allow for first name and last name (with spaces) the space is required in the literal string
		return this.employees.filter(employee => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(filterValue));
	}

	// Sory employees alphabetically by first name + last name
	private sortEmployees(): void {
		this.employees.sort((a, b) => {
			let firstNameA = `${a.firstName}${a.lastName}`.toLowerCase();
			let firstNameB = `${b.firstName}${b.lastName}`.toLowerCase();

			if (firstNameA < firstNameB) {
				return -1;
			}

			if (firstNameA > firstNameB) {
				return 1;
			}

			return 0;

		});
	}

	// Calculate cost for the current employee
	private _calculateEmployeeCost(employee: Employee): void {
		let cost = employee.firstName.toLowerCase().startsWith(this.discountLetter) ? this.discountPerEmployee : this.costPerEmployee;

		// If there are dependents, calculate the cost
		if (employee.dependents && employee.dependents?.length > 0 ) {
			let discountedDependents = employee.dependents.filter((dependent) => dependent.firstName.toLowerCase().startsWith(this.discountLetter)).length;
			// We already filtered through the dependents, get the remaining
			let remainingDependents = employee.dependents.length - discountedDependents;
			console.log(discountedDependents);
			console.log(remainingDependents);

			cost = cost + (discountedDependents * this.discountPerDependent) + (remainingDependents * this.constPerDependent);
		}

		this.employeeCost = cost;
		this.employeeTakeHome = Math.round((((26 * this.paycheckAmount) - this.employeeCost) / 26) * 100) / 100;

		this._calculateTotalCost();
	}

	private _calculateTotalCost(): void {
		let activeEmployees = this.employees.filter(employee => employee.status == 'Active');
		let discountedEmployees = activeEmployees.filter((employee) => employee.firstName.toLowerCase().startsWith(this.discountLetter)).length;
		let totalDependents = 0;
		let discountedDependents = 0;

		let totalEmployeeCost = (discountedEmployees * this.discountPerEmployee) + ((activeEmployees.length - discountedEmployees) * this.costPerEmployee);

		// Get total number of depenents and discounted dependents
		for (let employee of activeEmployees) {
			if (employee.dependents) {
				totalDependents = totalDependents + (employee.dependents ? employee.dependents.length : 0);
				discountedDependents = discountedDependents + employee.dependents.filter((dependent) => dependent.firstName.toLowerCase().startsWith(this.discountLetter)).length;
			}
		}

		let totalDependentCost = (discountedDependents * this.discountPerDependent) + ((totalDependents - discountedDependents) * this.constPerDependent);
		this.totalActiveEmployees = activeEmployees.length;
		this.totalDependents = totalDependents;
		this.totalCost = totalEmployeeCost + totalDependentCost;
	}
}
