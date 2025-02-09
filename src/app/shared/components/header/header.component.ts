import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        RouterModule,
        DropdownModule,
        FormsModule
    ],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isUserLoggedIn = false;
    userName = '';
    isDropdownOpen = false;
    cartItemCount: number = 0;
    searchQuery = '';
    @ViewChild('searchInput') searchInput!: ElementRef;
    private authSubscription!: Subscription;
    private cartSubscription!: Subscription;
    private searchSubject = new Subject<string>();
    private searchSubscription!: Subscription;
    private routeSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        private router: Router,
        private route: ActivatedRoute,
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

        this.searchSubscription = this.searchSubject.pipe(
            debounceTime(300)
        ).subscribe(searchTerm => {
            if (searchTerm) {
                this.router.navigate(['/productos'], { queryParams: { name: searchTerm } });
            } else {
                this.router.navigate(['/productos'], { queryParams: { name: null } });
            }
        });

        this.routeSubscription = this.route.queryParams.subscribe(params => {
            if (params['name']) {
                this.searchQuery = params['name'];
                // Update the input value using ViewChild
                if (this.searchInput) {
                    this.searchInput.nativeElement.value = this.searchQuery;
                }
                this.searchSubject.next(this.searchQuery);
            }
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

    onSearchInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchQuery = input.value;
        this.searchSubject.next(this.searchQuery);
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }
}
