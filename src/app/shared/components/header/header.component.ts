import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, InputTextModule, ButtonModule, RouterModule, DropdownModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  userName = '';
  isDropdownOpen = false; // Add this line
  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.updateUserState(status);
    });
    // Read user state from cookie on initialization
    const user = this.authService.getUser();
    if (user) {
      this.isUserLoggedIn = true;
      this.userName = user.nombres;
    }
  }

  updateUserState(status: boolean) {
    this.isUserLoggedIn = status;
    if (this.isUserLoggedIn) {
      this.userName = this.authService.getUser().nombres; // Obtiene el nombre real del usuario
    } else {
      this.userName = '';
    }
  }

  toggleDropdown(event: Event) {
    if (event.eventPhase !== Event.AT_TARGET) {
      return;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(event: Event) {
    if (event.eventPhase !== Event.AT_TARGET) {
      return;
    }
    this.authService.logout();
    this.isDropdownOpen = false; // Close the dropdown on logout
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
