import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CurrencySolesPipe } from '../../pipes/currency-soles.pipe';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        RouterModule,
        CurrencySolesPipe,
    ],
})
export class ProductCardComponent {
    @Input() product!: {
        id: string;
        image: string;
        name: string;
        price: number;
        rating: number;
    };
}
