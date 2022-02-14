import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BenefitsComponent } from './benefits.component';

describe('BenefitsComponent', () => {
	let component: BenefitsComponent;
	let fixture: ComponentFixture<BenefitsComponent>;

	beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [ HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
				declarations: [ BenefitsComponent, MatAutocomplete ],
				providers: [
					{provide: MatDialog},
					{
						provide: MatDialogRef,
						useValue: []
					}
				],
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BenefitsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should open Add Employee Dialog', () => {
		component.openAddPerson(0);
		fixture.detectChanges();
		const dialogHeader = document.getElementsByTagName('h1')[0]?.textContent;
		expect(dialogHeader).toEqual('Add Employee');
	});

	it('should open Add Dependent Dialog', () => {
		component.openAddPerson(1);
		fixture.detectChanges();
		const dialogHeader = document.getElementsByTagName('h1')[0]?.textContent;
		expect(dialogHeader).toEqual('Add Dependent');
	});
});
