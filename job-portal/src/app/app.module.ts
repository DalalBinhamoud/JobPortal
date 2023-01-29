import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AdminModule } from './modules/admin/admin.module'
import { ApplicantModule } from './modules/applicant/applicant.module'
import { HeaderComponent } from './shared/components/header/header.component'
import { FooterComponent } from './shared/components/footer/footer.component'
import { NgxTranslateModule } from './modules/ngx-translate/ngx-translate.module'
import { InterceptorService } from './services/interceptor/interceptor.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from './shared-module/shared/shared.module'

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApplicantModule,
    AdminModule,
    NgxTranslateModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
