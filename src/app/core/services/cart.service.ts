import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private storageKey = 'shoppingCart';
    private cartItemsSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>(this.getCart());

    constructor() { }

    addProductToCart(product: Product, quantity: number): void {
        const cart = this.getCart();
        const existingProduct = cart.find(item => item.product.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }

        this.saveCart(cart);
        this.cartItemsSubject.next(cart);
    }

    removeProductFromCart(productId: number): void {
        const cart = this.getCart().filter(item => item.product.id !== productId);
        this.saveCart(cart);
        this.cartItemsSubject.next(cart);
    }

    getCart(): { product: Product, quantity: number }[] {
        if (typeof window !== 'undefined') {
            const cart = localStorage.getItem(this.storageKey);
            return cart ? JSON.parse(cart) : [];
        }
        return [];
    }

    saveCart(cart: { product: Product, quantity: number }[]): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.storageKey, JSON.stringify(cart));
        }
    }

    clearCart(): void {
        localStorage.removeItem(this.storageKey);
        this.cartItemsSubject.next([]);
    }

    getCartItems() {
        return this.cartItemsSubject.asObservable();
    }
}
