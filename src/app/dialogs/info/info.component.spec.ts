import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
	let component: InfoComponent;
	let fixture: ComponentFixture<InfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [{provide: MatDialog}],
			imports: [MatDialogModule],
			declarations: [ InfoComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
