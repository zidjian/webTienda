import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        RouterModule,
        DropdownModule,
    ],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isUserLoggedIn = false;
    userName = '';
    isDropdownOpen = false;
    cartItemCount: number = 0;
    private authSubscription!: Subscription;
    private cartSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private cartService: CartService,
    ) { }

    ngOnInit() {
        this.authSubscription = this.authService.authStatus$.subscribe(
            status => {
                this.updateUserState(status);
            }
        );
        // Read user state from cookie on initialization
        const user = this.authService.getUser();
        if (user) {
            this.isUserLoggedIn = true;
            this.userName = user.nombres;
        }

        this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
            this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
        });
    }

    updateUserState(status: boolean) {
        this.isUserLoggedIn = status;
        if (this.isUserLoggedIn) {
            this.userName = this.authService.getUser().nombres; // Obtiene el nombre real del usuario
        } else {
            this.userName = '';
        }
    }

    toggleDropdown(event: MouseEvent) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    logout(event: MouseEvent) {
        event.stopPropagation();
        this.authService.logout();
        this.isDropdownOpen = false; // Close the dropdown on logout
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
