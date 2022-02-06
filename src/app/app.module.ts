import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		BenefitsComponent,
		DialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		MaterialModule

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
