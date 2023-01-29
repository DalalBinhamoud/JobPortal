import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { LayoutComponent } from './layout/layout.component'
import { LoginComponent } from './components/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { ApplicationsComponent } from './components/applications/applications.component'
import { SharedModule } from 'src/app/shared-module/shared/shared.module'

@NgModule({
  declarations: [LayoutComponent, LoginComponent, ApplicationsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
})
export class AdminModule {}
