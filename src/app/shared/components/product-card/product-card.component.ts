import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { CurrencySolesPipe } from '../../pipes/currency-soles.pipe';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

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
    @Input() product?: Product;

    constructor(private cartService: CartService, private router: Router) { }

    buyNow() {
        if (this.product) {
            this.cartService.addProductToCart(this.product, 1);
            this.router.navigate(['/finalizar-compra']);
        }
    }
}
