import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { RatingStarsComponent } from './rating-stars.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent],
  template: `
    <div class="bg-white card-hover rounded-lg overflow-hidden shadow-sm">
      <div class="relative h-64 overflow-hidden">
        <img [src]="product.imageUrls?.[0]" alt="" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
      </div>
      <div class="p-4 space-y-2">
        <h3 class="text-xl font-semibold text-black">{{ product.title }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">₹{{ product.price }}</span>
          <app-rating-stars [rating]="product.rating || 0"></app-rating-stars>
        </div>
        <a [routerLink]="['/product', product.id]" class="btn-primary inline-block text-sm text-center w-full">View Product</a>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
}
