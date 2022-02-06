import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from './dialog/dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(public dialog: MatDialog) {}

	title = 'payhaste';
	faInfo = faInfo;
	faLinkedIn = faLinkedinIn;

	openInfo() {
		this.dialog.open(DialogComponent);
	}
}
