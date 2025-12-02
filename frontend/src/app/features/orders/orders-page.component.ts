import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-5xl mx-auto py-12 px-6">
      <h2 class="text-3xl font-bold mb-6">Orders</h2>
      <div class="grid gap-4" *ngIf="orders.length; else noOrders">
        <div *ngFor="let order of orders" class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-between">
            <div class="font-semibold">Order #{{ order.id }}</div>
            <div class="text-sm text-gray-500">{{ order.createdAt | date:'medium' }}</div>
          </div>
          <div class="text-lg font-bold mt-2">₹{{ order.totalAmount }}</div>
          <div class="text-sm text-gray-600">{{ order.items.length }} items</div>
        </div>
      </div>
      <ng-template #noOrders>
        <p>No orders yet.</p>
      </ng-template>
    </div>
  `
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.mine().subscribe(o => this.orders = o);
  }
}
