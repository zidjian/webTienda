import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencySolesPipe } from '../../pipes/currency-soles.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    imports: [
        CommonModule,
        CarouselModule,
        CurrencySolesPipe,
        RouterModule,
        ButtonModule,
    ],
})
export class SliderComponent {
    @Input() images: string[] = [];
    @Input() products: {
        id: number;
        title: string;
        description: string;
        price: number;
        image: string;
    }[] = [];

    constructor(private router: Router) {}

    redirectToProduct(id: number) {
        this.router.navigate(['/producto', id]);
    }
}
