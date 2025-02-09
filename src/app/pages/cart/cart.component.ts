import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { CurrencySolesPipe } from '../../shared/pipes/currency-soles.pipe';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, CurrencySolesPipe, ButtonModule, RouterModule],
    templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
    cartItems: { product: Product, quantity: number }[] = [];
    total: number = 0;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.getCartItems().subscribe(items => {
            this.cartItems = items;
            this.calculateTotal();
        });
    }

    increaseQuantity(productId: number): void {
        const item = this.cartItems.find(item => item.product.id === productId);
        if (item) {
            this.cartService.addProductToCart(item.product, 1);
            this.calculateTotal();
        }
    }

    decreaseQuantity(productId: number): void {
        const item = this.cartItems.find(item => item.product.id === productId);
        if (item && item.quantity > 1) {
            this.cartService.addProductToCart(item.product, -1);
            this.calculateTotal();
        }
    }

    removeFromCart(productId: number): void {
        this.cartService.removeProductFromCart(productId);
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        this.calculateTotal();
    }

    calculateTotal(): void {
        this.total = this.cartItems.reduce((acc, item) => acc + item.product.precio * item.quantity, 0);
    }
}
