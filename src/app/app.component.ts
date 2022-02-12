import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faInfo, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { InfoComponent } from './dialogs/info/info.component';
import { EmployeeService } from './service/employee.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}

	title = 'payhaste';
	faInfo = faInfo;
	faLinkedIn = faLinkedinIn;
	faRefresh = faRetweet;

	openInfo() {
		this.dialog.open(InfoComponent);
	}

	// Remove and reinsert the default employee list
	resetEmployees() {
		this.employeeService.resetEmployees().subscribe(data => {
			console.log(data);
			// Reload the page
			location.reload();
		})
	}
}
