import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Step 2 of 2</p>
          <h2 class="text-4xl font-black leading-tight">Checkout</h2>
          <p class="text-slate-600">Complete your order details</p>
        </div>
        
        <form (ngSubmit)="submit()" class="bg-white/90 backdrop-blur rounded-3xl shadow-lg border border-orange-100 p-8">
          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Shipping Address
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Full Name <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="fullName" 
                  name="fullName" 
                  type="text"
                  placeholder="John Doe"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Phone Number <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="phoneNumber" 
                  name="phoneNumber" 
                  type="tel"
                  placeholder="+91 98765 43210"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="md:col-span-2 space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Address Line 1 <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="addressLine1" 
                  name="addressLine1" 
                  type="text"
                  placeholder="House No., Building Name"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="md:col-span-2 space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Address Line 2</label>
                <input 
                  [(ngModel)]="addressLine2" 
                  name="addressLine2" 
                  type="text"
                  placeholder="Street, Locality"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">City <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="city" 
                  name="city" 
                  type="text"
                  placeholder="Mumbai"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">State <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="state" 
                  name="state" 
                  type="text"
                  placeholder="Maharashtra"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Postal Code <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="postalCode" 
                  name="postalCode" 
                  type="text"
                  placeholder="400001"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Country <span class="text-red-500">*</span></label>
                <input 
                  [(ngModel)]="country" 
                  name="country" 
                  type="text"
                  placeholder="India"
                  value="India"
                  class="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                  required>
              </div>
            </div>
          </div>
          
          <div class="border-t border-slate-200 pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <p class="text-sm text-slate-600 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Your information is secure
            </p>
            <button type="submit" class="btn-primary bg-gradient-to-r from-black via-slate-900 to-slate-800 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CheckoutPageComponent {
  fullName = '';
  phoneNumber = '';
  addressLine1 = '';
  addressLine2 = '';
  city = '';
  state = '';
  postalCode = '';
  country = 'India';
  
  constructor(private orderService: OrderService, private router: Router) {}

  submit() {
    const shippingAddress = `${this.fullName}\n${this.phoneNumber}\n${this.addressLine1}\n${this.addressLine2}\n${this.city}, ${this.state} ${this.postalCode}\n${this.country}`;
    this.orderService.create(shippingAddress).subscribe(order => {
      this.router.navigate(['/orders']);
    });
  }
}
