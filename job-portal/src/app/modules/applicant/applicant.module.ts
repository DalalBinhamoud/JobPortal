import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { ApplicationFormComponent } from './application-form/application-form.component';


@NgModule({
  declarations: [
    ApplicationFormComponent
  ],
  imports: [
    CommonModule,
    ApplicantRoutingModule
  ]
})
export class ApplicantModule { }
