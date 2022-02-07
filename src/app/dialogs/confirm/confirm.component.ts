import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

	constructor(private dialogRef: MatDialogRef<ConfirmComponent>) { }

	ngOnInit(): void {
	}

	ok() {
		this.dialogRef.close(true);
	}

	cancel() {
		this.dialogRef.close();
	}

}
