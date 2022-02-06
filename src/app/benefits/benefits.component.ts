import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';
import { AddPersonComponent } from '../dialogs/add-person/add-person.component';
import { Employee } from '../models/employee';

@Component({
	selector: 'app-benefits',
	templateUrl: './benefits.component.html',
	styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

	constructor(public dialog: MatDialog) { }

	faPlus = faPlus;
	faSearch = faSearch
	employeeControl = new FormControl();

	status = {
		active: 'Active',
		terminated: 'Terminated'
	}

	employees: Employee[] = [
		{
			firstName: 'Tony',
			lastName: 'Stark',
			dob: new Date('1970-05-27'),
			status: this.status.active
		},
		{
			firstName: 'Natasha',
			lastName: 'Romanoff',
			dob: new Date('1984-12-03'),
			status: this.status.terminated
		},
		{
			firstName: 'Wanda',
			lastName: 'Maximoff',
			dob: new Date('1989-03-05'),
			status: this.status.active
		},
		{
			firstName: 'Wade',
			lastName: 'Wilson',
			dob: new Date('1973-11-22'),
			status: this.status.active
		},
		{
			firstName: 'Peter',
			lastName: 'Parker',
			dob: new Date('1995-08-10'),
			status: this.status.active
		}
	]

	filteredEmployees: Observable<Employee[]> | undefined;

	ngOnInit() {
		this.filteredEmployees = this.employeeControl.valueChanges.pipe(
			startWith(''),
			map(value => (typeof value === 'string' ? value : value.name)),
			map(name => (name ? this._filter(name) : this.employees.slice())),
		);
		this.sortEmployees();
	}

	// Open a dialog to create a new person
	openAddEmployee() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;

		this.dialog.open(AddPersonComponent, dialogConfig);
	}

	displayFn(employee: Employee): string {
		return employee && employee.firstName && employee.lastName ? `${employee.firstName} ${employee.lastName}` : '';
	}

	private _filter(name: string): Employee[] {
		const filterValue = name.toLowerCase();

		this.sortEmployees();

		// To allow for first name and last name (with spaces) the space is required in the literal string
		return this.employees.filter(employee => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(filterValue));
	}

	private sortEmployees() {
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

}
