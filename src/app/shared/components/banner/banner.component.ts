import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    imports: [ToastModule, CardModule],
})
export class BannerComponent {}
