import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let app: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MatDialogModule,
				HttpClientTestingModule
			],
			declarations: [
				AppComponent
			],
			providers: [
				{ provide: MatDialog },
				{ provide: Overlay },
				{
					provide: MatDialogRef,
					useValue: []
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it(`should have as title 'payhaste'`, () => {
		expect(app.title).toEqual('payhaste');
	});

	it('should render title', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.toolbar span.title')?.textContent).toContain('payhaste');
	});
});
