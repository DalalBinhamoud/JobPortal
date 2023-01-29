import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedRoutingModule } from './shared-routing.module'
import { InputInDropdownComponent } from '../components/input-in-dropdown/input-in-dropdown.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { SideMenuComponent } from '../components/side-menu/side-menu.component'

@NgModule({
  declarations: [InputInDropdownComponent, SideMenuComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [InputInDropdownComponent, SideMenuComponent],
})
export class SharedModule {}
