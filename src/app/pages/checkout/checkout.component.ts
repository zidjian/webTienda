import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencySolesPipe } from '../../shared/pipes/currency-soles.pipe';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'app-checkout', // Corrected selector name
    templateUrl: './checkout.component.html',
    imports: [CommonModule, ButtonModule, RouterModule, CurrencySolesPipe, InputSwitchModule, FormsModule, ReactiveFormsModule],
})
export class CheckoutComponent implements OnInit {
    cartItems: { product: Product; quantity: number; }[] = [];
    productCost: number = 0;
    shippingCost: number = 10; // Example shipping cost
    discount: number = 0;
    tax: number = 0.18; // Example tax rate
    totalBeforeTax: number = 0;
    totalTax: number = 0;
    total: number = 0;
    termsAccepted: boolean = false;

    checkoutForm!: FormGroup;

    constructor(private cartService: CartService, private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.initializeForm(); // Moved form initialization here
        this.cartService.getCartItems().subscribe(items => {
            this.cartItems = items;
            this.calculateTotals();
        });
    }

    initializeForm() {
        this.checkoutForm = this.fb.group({
            address: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', Validators.required],
            paymentMethod: ['', Validators.required],
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
        console.log('Form submitted'); // Add this line to check if the method is called
        if (this.checkoutForm.valid) {
            const { address, city, postalCode, paymentMethod, cardNumber, expiryDate, termsAccepted } = this.checkoutForm.value;
            if (termsAccepted) {
                const orderDetails = {
                    address,
                    city,
                    postalCode,
                    paymentMethod,
                    cardNumber,
                    expiryDate,
                    cartItems: this.cartItems,
                    productCost: this.productCost,
                    shippingCost: this.shippingCost,
                    discount: this.discount,
                    totalBeforeTax: this.totalBeforeTax,
                    totalTax: this.totalTax,
                    total: this.total
                };
                console.log('Detalles de la orden:', orderDetails);
            } else {
                console.log('Por favor, acepte los términos y condiciones.');
            }
        } else {
            this.checkoutForm.markAllAsTouched();
            console.log('Por favor, complete todos los campos requeridos.');
        }
    }
}
