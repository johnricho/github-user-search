import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { RequestInterceptor } from './helpers/request-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  exports: [BrowserModule,NgxPaginationModule,RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
