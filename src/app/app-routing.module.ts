import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitsComponent } from './benefits/benefits.component';

const routes: Routes = [
	{ path: '', redirectTo: '/benefits', pathMatch: 'full' },
	{ path: 'benefits', component: BenefitsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
