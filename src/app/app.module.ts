import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
    CookieService,
    MessageService,
  ],
})
export class AppModule { }
