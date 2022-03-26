import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import vi from '@angular/common/locales/en';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { interceptorProvider } from './_shared/auth.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponentComponent } from './component/page-not-found-component/page-not-found-component.component';
import { ComponentComponent } from './component/component.component';
import { LoginComponent } from './_shared/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './_shared/navbar/navbar.component';
import { MenuComponent } from './_shared/components/menu/menu.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    ComponentComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    interceptorProvider,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
