import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { InfoComponent } from './dialogs/info/info.component';
import { AddPersonComponent } from './dialogs/add-person/add-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		BenefitsComponent,
		InfoComponent,
		AddPersonComponent,
		ConfirmComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
