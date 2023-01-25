import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';

@NgModule({
  declarations: [ApplicationFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTranslateModule,
  ],
})
export class ApplicantModule {}
