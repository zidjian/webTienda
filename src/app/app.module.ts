import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [BrowserModule, AppComponent],
    providers: [provideHttpClient(withFetch()), CookieService, MessageService],
})
export class AppModule {}
