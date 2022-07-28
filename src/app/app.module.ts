import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { RequestInterceptor } from './helpers/request-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [BrowserModule,NgxPaginationModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
     { 
      provide: HTTP_INTERCEPTORS,
      useClass:RequestInterceptor, 
      multi:true
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
