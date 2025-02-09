import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencySolesPipe } from '../../shared/pipes/currency-soles.pipe';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { AuthService } from '../../core/services/auth.service';
import { DialogModule } from 'primeng/dialog';
import confetti from 'canvas-confetti';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    imports: [CommonModule, ButtonModule, RouterModule, CurrencySolesPipe, ToggleSwitchModule, FormsModule, ReactiveFormsModule, DialogModule],
    providers: [CurrencySolesPipe]
})
export class CheckoutComponent implements OnInit {
    cartItems: { product: Product; quantity: number; }[] = [];
    productCost: number = 0;
    shippingCost: number = 0;
    discount: number = 0;
    tax: number = 0.18;
    totalBeforeTax: number = 0;
    totalTax: number = 0;
    total: number = 0;
    termsAccepted: boolean = false;
    displayModal: boolean = false;

    checkoutForm!: FormGroup;

    constructor(
        private authService: AuthService, private http: HttpClient, private cartService: CartService, private fb: FormBuilder, private router: Router, private messageService: MessageService) { }

    ngOnInit() {
        this.initializeForm(); // Moved form initialization here
        this.cartService.getCartItems().subscribe(items => {
            this.cartItems = items;
            if (this.cartItems.length === 0) {
                this.router.navigate(['/productos']); // Redirect to products page if cart is empty
            } else {
                this.calculateTotals();
            }
        });
    }

    initializeForm() {
        this.checkoutForm = this.fb.group({
            address: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', Validators.required],
            cardNumber: ['', Validators.required],
            expiryDate: ['', Validators.required],
            termsAccepted: [false, Validators.requiredTrue]
        });
    }

    calculateTotals() {
        this.productCost = this.cartItems.reduce((acc, item) => acc + item.product.precio * item.quantity, 0);
        this.totalBeforeTax = this.productCost + this.shippingCost - this.discount;
        this.totalTax = this.totalBeforeTax * this.tax;
        this.total = this.totalBeforeTax + this.totalTax;
    }

    onSubmit() {
        if (this.checkoutForm.valid) {
            const { termsAccepted } = this.checkoutForm.value;
            const postData = {
                cliente_id: this.authService.getUser().id, // Example client ID
                productos: this.cartItems.map(item => ({
                    id: item.product.id,
                    cantidad: item.quantity
                }))
            };

            const headers = this.authService.sendToken();

            this.http.post(`${environment.API_URL}ordenes`, postData, { headers }).subscribe({
                next: response => {
                    this.cartService.clearCart(); // Clear the cart after order submission
                    this.showConfetti(); // Show confetti
                    this.showToast('success', 'Orden Exitosa', '¡Tu orden ha sido realizada con éxito!');
                    this.router.navigate(['/ordenes']); // Redirect to orders page
                },
                error: error => {
                    console.error('Error submitting order', error);
                    this.showToast('error', 'Error', 'Hubo un problema al realizar tu orden.');
                }
            });
        } else {
            this.checkoutForm.markAllAsTouched();
        }
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail });
    }

    showConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
