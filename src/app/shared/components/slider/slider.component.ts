import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencySolesPipe } from '../../pipes/currency-soles.pipe';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

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
    @Input() products: Product[] = [];

    constructor(private router: Router, private cartService: CartService) { }

    redirectToProduct(id: number) {
        this.router.navigate(['/producto', id]);
    }

    buyNow(product: Product) {
        this.cartService.addProductToCart(product, 1);
        this.router.navigate(['/finalizar-compra']);
    }
}
