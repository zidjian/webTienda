import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastModule,
        AppComponent,
    ],
    providers: [CookieService, MessageService],
})
export class AppModule { }
