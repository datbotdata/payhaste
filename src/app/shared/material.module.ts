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
		BrowserModule
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
		BrowserModule
	],
})
export class MaterialModule { }
