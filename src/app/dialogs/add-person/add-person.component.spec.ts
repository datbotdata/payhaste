import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddPersonComponent } from './add-person.component';

describe('AddPersonComponent', () => {
	let component: AddPersonComponent;
	let fixture: ComponentFixture<AddPersonComponent>;
	let dialog: MatDialog;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ MatDialogModule ],
			declarations: [ AddPersonComponent ],
			providers: [
				{ provide: MatDialog },
				{
					provide: MatDialogRef,
					useValue: []
				},
				{
					provide: MAT_DIALOG_DATA,
					useValue: [
						{ data: { personType: 1 } }
					]
				}
			]
		})
		.compileComponents();

		dialog = TestBed.inject(MatDialog);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddPersonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
