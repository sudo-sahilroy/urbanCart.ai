import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-lg mx-auto py-16 px-6 space-y-6">
      <div class="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Join UrbanCart</p>
          <h2 class="text-3xl font-bold mt-2">Create account</h2>
          <p class="text-sm text-slate-600 mt-1">Save looks, track orders, and sync AI picks across devices.</p>
        </div>
        <form (ngSubmit)="submit()" class="space-y-4">
          <input [(ngModel)]="fullName" name="fullName" placeholder="Full name" class="w-full border rounded-lg p-3 focus:outline-none focus:border-black" required>
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" class="w-full border rounded-lg p-3 focus:outline-none focus:border-black" required>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="w-full border rounded-lg p-3 focus:outline-none focus:border-black" required>
          <button type="submit" class="btn-primary w-full" [disabled]="loading">{{ loading ? 'Creating account…' : 'Sign up' }}</button>
          <p class="text-sm text-red-600" *ngIf="error">{{ error }}</p>
        </form>
      </div>
      <div class="text-center text-sm text-slate-700">
        Already have an account?
        <a routerLink="/login" class="underline font-semibold">Login</a>
      </div>
    </div>
  `
})
export class SignupComponent {
  fullName = '';
  email = '';
  password = '';
  loading = false;
  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.signup({ fullName: this.fullName, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Unable to create account. Please try again.';
      }
    });
  }
}
