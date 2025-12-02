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
    <div class="max-w-4xl mx-auto py-12 px-6">
      <h2 class="text-3xl font-bold mb-6">Checkout</h2>
      <form (ngSubmit)="submit()" class="space-y-4">
        <label class="block text-sm">Shipping Address</label>
        <textarea [(ngModel)]="shippingAddress" name="address" class="w-full border p-3" rows="4" required></textarea>
        <button type="submit" class="btn-primary">Place Order</button>
      </form>
    </div>
  `
})
export class CheckoutPageComponent {
  shippingAddress = '';
  constructor(private orderService: OrderService, private router: Router) {}

  submit() {
    this.orderService.create(this.shippingAddress).subscribe(order => {
      this.router.navigate(['/orders']);
    });
  }
}
