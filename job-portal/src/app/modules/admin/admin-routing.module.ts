import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ApplicationsComponent } from './components/applications/applications.component'
import { LoginComponent } from './components/login/login.component'
import { LayoutComponent } from './layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
