import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment';
import { CurrencySolesPipe } from '../../shared/pipes/currency-soles.pipe';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    imports: [CurrencySolesPipe, ButtonModule]
})
export class ProductDetailComponent implements OnInit {
    product: Product | undefined;
    quantity: number = 1;
    totalPrice: number = 0;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

    ngOnInit(): void {
        this.getProductDetails();
    }

    getProductDetails(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.http.get<Product>(`${environment.API_URL}productos/${productId}`).subscribe(
                (data: Product) => {
                    this.product = data;
                    this.updateTotalPrice();
                },
                (error) => {
                    console.error('Error fetching product details:', error);
                    this.router.navigate(['/']);
                }
            );
        }
    }

    increaseQuantity(): void {
        if (this.product && this.quantity < this.product.stock) {
            this.quantity++;
            this.updateTotalPrice();
        }
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
            this.updateTotalPrice();
        }
    }

    updateTotalPrice(): void {
        if (this.product && this.product.precio) {
            this.totalPrice = this.product.precio * this.quantity;
        }
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addProductToCart(this.product, this.quantity);
            this.updateTotalPrice(); // Ensure total price is updated
        }
    }

    buyNow(): void {
        // Lógica para comprar ahora
        console.log(`Comprando ${this.quantity} de ${this.product?.nombre}`);
    }
}
