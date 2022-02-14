import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
	let component: ConfirmComponent;
	let fixture: ComponentFixture<ConfirmComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ MatDialogModule ],
			declarations: [ ConfirmComponent ],
			providers: [
				{provide: MatDialog},
				{
					provide: MatDialogRef,
					useValue: { ok: (dialogResult: boolean) => { return true; } }
				}
			],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
