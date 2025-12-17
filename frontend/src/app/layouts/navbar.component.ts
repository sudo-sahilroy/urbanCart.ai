import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="sticky top-0 z-40 bg-black text-white px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold tracking-wide"><a routerLink="/">UrbanCart.ai</a></div>
      <div class="hidden md:flex items-center space-x-6 uppercase text-sm">
        <a routerLink="/ai-search" class="hover:underline">AI Search</a>
        <a routerLink="/orders" class="hover:underline">Orders</a>
        <a routerLink="/profile" class="hover:underline">Profile</a>
        <a routerLink="/cart" class="hover:underline">Cart</a>
        <a *ngIf="!isLoggedIn()" routerLink="/login" class="hover:underline">Login</a>
        <a *ngIf="!isLoggedIn()" routerLink="/signup" class="hover:underline">Sign up</a>
        <button *ngIf="isLoggedIn()" (click)="logout()" class="hover:underline">LOGOUT</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(private auth: AuthService) {}
  isLoggedIn = computed(() => !!this.auth.accessToken());
  logout() { this.auth.logout(); }
}
