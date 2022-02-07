import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
	imports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatTooltipModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		MatCheckboxModule,
		BrowserModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule
	],
	exports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatTooltipModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		MatCheckboxModule,
		BrowserModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule
	],
})
export class MaterialModule { }
