import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-lg mx-auto py-16 px-6 space-y-6">
      <div class="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
          <h2 class="text-3xl font-bold mt-2">Login</h2>
          <p class="text-sm text-slate-600 mt-1">Access your orders, saved looks, and AI search history.</p>
        </div>
        <form (ngSubmit)="submit()" class="space-y-4">
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" class="w-full border rounded-lg p-3 focus:outline-none focus:border-black" required>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="w-full border rounded-lg p-3 focus:outline-none focus:border-black" required>
          <button type="submit" class="btn-primary w-full" [disabled]="loading">{{ loading ? 'Signing in…' : 'Login' }}</button>
          <p class="text-sm text-red-600" *ngIf="error">{{ error }}</p>
        </form>
      </div>
      <div class="text-center text-sm text-slate-700">
        New here?
        <a routerLink="/signup" class="underline font-semibold">Create an account</a>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Unable to sign in. Check your credentials.';
      }
    });
  }
}
