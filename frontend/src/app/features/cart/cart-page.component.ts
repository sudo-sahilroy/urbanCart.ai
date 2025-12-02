import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart.model';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, QuantitySelectorComponent, RouterLink],
  template: `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen">
      <div class="max-w-6xl mx-auto py-12 px-6" *ngIf="items.length; else empty">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Bag</p>
            <h2 class="text-4xl font-black leading-tight">Your Cart</h2>
            <p class="text-slate-600">{{ items.length }} item(s) curated</p>
          </div>
          <a routerLink="/checkout" class="btn-primary bg-gradient-to-r from-black via-slate-900 to-orange-500 rounded-full px-6">Proceed to checkout</a>
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-4">
            <div *ngFor="let item of items" class="bg-white/90 backdrop-blur p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
              <img [src]="item.product.imageUrls[0]" class="w-28 h-28 object-cover rounded-2xl" alt="">
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="font-semibold text-lg">{{ item.product.title }}</div>
                  <button class="text-sm text-slate-500 hover:text-black underline" (click)="remove(item)">Remove</button>
                </div>
                <div class="text-slate-600">₹{{ item.product.price }}</div>
                <div class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ item.product.category }}</div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <app-quantity-selector [(value)]="item.quantity" (valueChange)="update(item, $event)"></app-quantity-selector>
                <div class="font-semibold">₹{{ item.product.price * item.quantity }}</div>
              </div>
            </div>
          </div>

          <div class="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-orange-100 space-y-4">
            <h3 class="text-xl font-black">Order summary</h3>
            <div class="flex items-center justify-between text-sm text-slate-700">
              <span>Subtotal</span>
              <span>₹{{ subtotal }}</span>
            </div>
            <div class="flex items-center justify-between text-sm text-slate-700">
              <span>Shipping</span>
              <span class="text-emerald-600 font-semibold">Free</span>
            </div>
            <div class="border-t border-slate-200 pt-3 flex items-center justify-between">
              <span class="font-semibold">Total</span>
              <span class="text-2xl font-black">₹{{ subtotal }}</span>
            </div>
            <a routerLink="/checkout" class="btn-primary w-full text-center rounded-full">Checkout</a>
            <p class="text-xs text-slate-500">Taxes calculated at checkout. COD available.</p>
          </div>
        </div>
      </div>
      <ng-template #empty>
        <div class="max-w-3xl mx-auto py-20 text-center">
          <p class="text-xl">Your cart is empty.</p>
          <a routerLink="/" class="btn-primary mt-4 inline-block">Shop now</a>
        </div>
      </ng-template>
    </div>
  `
})
export class CartPageComponent implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.cart.getCart().subscribe(items => {
      this.items = items;
      this.subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    });
  }

  update(item: CartItem, quantity: number) {
    this.cart.update(item.product.id, quantity).subscribe(() => this.load());
  }

  remove(item: CartItem) {
    this.cart.remove(item.product.id).subscribe(() => this.load());
  }
}
