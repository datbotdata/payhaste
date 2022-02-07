import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faEdit, faPlus, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';
import { AddPersonComponent } from '../dialogs/add-person/add-person.component';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { Employee } from '../models/employee';
import { PersonType } from '../models/person-type';
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
	employeeCost = 0;
	employeeTakeHome = 0;
	costPerEmployee = 1000;
	constPerDependent = 500;
	discountLetter = 'a';
	discountPercent = 10;
	paycheckAmount = 2000;
	totalCost = 0;

	// Create as enum
	status = {
		active: 'Active',
		terminated: 'Terminated'
	}

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
			if (data) {
				this.employee?.dependents?.splice(index, 1);
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
		let employeeDiscount = employee.firstName.toLowerCase().startsWith(this.discountLetter);
		let dependentCount = employee.dependents ? employee.dependents.length : 0;

		let cost = this.costPerEmployee + (500 * dependentCount);
		this.employeeCost = employeeDiscount ? cost * .10 : cost;
		this.employeeTakeHome = Math.round((((26 * this.paycheckAmount) - this.employeeCost) / 26) * 100) / 100;
	}

	private _calculateTotalCost(): void {
		let activeEmployees = this.employees.filter(employee => employee.status == this.status.active);
		let discountedEmployees = activeEmployees.filter((employee) => employee.firstName.toLowerCase().startsWith(this.discountLetter)).length;
		let totalDependents = 0;
		let discountedDependents = 0;

		// Get total number of depenents and discounted dependents
		for (let employee of activeEmployees) {
			if (employee.dependents) {
				totalDependents = totalDependents + (employee.dependents ? employee.dependents.length : 0);
				discountedDependents = discountedDependents + employee.dependents.filter((dependent) => dependent.firstName.toLowerCase().startsWith(this.discountLetter)).length;
			}
		}
		console.log(totalDependents);
		console.log(discountedEmployees);
		// this.totalCost
	}
}
