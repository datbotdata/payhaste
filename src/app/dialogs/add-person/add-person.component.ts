import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonType } from '../../../../models/person-type';

@Component({
	selector: 'app-add-person',
	templateUrl: './add-person.component.html',
	styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

	title: string = '';
	form: FormGroup;
	employeeFields = true;
	dependentFields = false;

	constructor(
		private dialogRef: MatDialogRef<AddPersonComponent>,
		@Inject(MAT_DIALOG_DATA) data: any
		) {
			switch(data.personType) {
				case PersonType.employee:
					this.title = 'Employee'
					break;
				case PersonType.dependent:
					this.title = 'Dependent'
					this.employeeFields = false;
					this.dependentFields = true;
					break;
			}

			this.form = new FormGroup({
				FirstName: new FormControl(''),
				LastName: new FormControl(''),
				DOB: new FormControl(Date),
				Status: new FormControl(''),
				Spouse: new FormControl(Boolean)
			});
		}

	ngOnInit(): void {
	}

	create() {
		this.dialogRef.close(this.form.value);
	}

	close() {
		this.dialogRef.close();
	}

}
