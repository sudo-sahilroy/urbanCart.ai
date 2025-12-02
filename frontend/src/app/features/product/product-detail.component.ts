import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Review } from '../../core/models/review.model';
import { ReviewListComponent } from '../../shared/components/review-list.component';
import { FormsModule } from '@angular/forms';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector.component';
import { CartService } from '../../core/services/cart.service';
import { RatingStarsComponent } from '../../shared/components/rating-stars.component';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { ProductService as ProdService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReviewListComponent, FormsModule, QuantitySelectorComponent, RatingStarsComponent, ProductCardComponent],
  template: `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen">
      <div class="max-w-6xl mx-auto py-12 px-6" *ngIf="product">
        <div class="grid md:grid-cols-2 gap-10 items-start">
          <div class="relative space-y-4">
            <div class="absolute -left-6 -top-6 h-24 w-24 bg-orange-200 blur-3xl opacity-70"></div>
            <div class="absolute -right-4 bottom-10 h-16 w-16 bg-slate-300 blur-2xl opacity-60"></div>
            <div class="relative h-[480px] overflow-hidden rounded-[28px] shadow-xl bg-gradient-to-br from-slate-900 via-black to-orange-400">
              <img [src]="product.imageUrls?.[selectedImage]" class="w-full h-full object-cover mix-blend-luminosity" alt="product">
              <div class="absolute top-4 left-4 bg-white/80 backdrop-blur text-xs px-3 py-2 rounded-full font-semibold text-slate-800 shadow">Limited drop</div>
              <div class="absolute bottom-4 right-4 bg-white/80 backdrop-blur text-xs px-3 py-2 rounded-full font-semibold text-slate-800 shadow flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>In stock
              </div>
            </div>
            <div class="flex space-x-3 overflow-x-auto">
              <button *ngFor="let img of product.imageUrls; let i = index"
                      (click)="selectedImage=i"
                      class="relative rounded-2xl border transition hover:-translate-y-1"
                      [class.border-slate-900]="selectedImage===i">
                <img [src]="img" class="w-24 h-24 object-cover rounded-2xl">
                <span *ngIf="selectedImage===i" class="absolute inset-0 ring-2 ring-slate-900 rounded-2xl"></span>
              </button>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 space-y-6 border border-orange-100">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">{{ product.category }}</p>
                <h1 class="text-4xl font-black leading-tight mt-1">{{ product.title }}</h1>
              </div>
              <app-rating-stars [rating]="product.rating || 0"></app-rating-stars>
            </div>
            <p class="text-slate-700 leading-relaxed">{{ product.description }}</p>
            <div class="text-4xl font-black text-slate-900">₹{{ product.price }}</div>
            <app-quantity-selector [(value)]="quantity"></app-quantity-selector>
            <div class="flex flex-wrap gap-3">
              <button class="btn-primary bg-gradient-to-r from-black via-slate-900 to-orange-500 rounded-full px-6" (click)="addToCart()">Add to cart</button>
              <button class="px-5 py-3 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition">Save for later</button>
            </div>
            <div class="grid grid-cols-3 gap-3 text-sm text-slate-700">
              <div class="p-3 rounded-2xl bg-orange-50 border border-orange-100">Fast dispatch</div>
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">Easy returns</div>
              <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">COD available</div>
            </div>
          </div>
        </div>

        <div class="mt-12 grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Community voice</p>
                <h3 class="text-2xl font-black mt-1">Reviews</h3>
              </div>
              <span class="text-sm text-slate-600">{{ reviews.length }} total</span>
            </div>
            <app-review-list [reviews]="reviews"></app-review-list>
            <form class="mt-4 space-y-3 bg-white rounded-2xl p-6 shadow border border-slate-100" (ngSubmit)="submitReview()">
              <div class="flex items-center gap-3">
                <label class="text-sm font-semibold text-slate-700">Rating</label>
                <input type="number" [(ngModel)]="newRating" name="rating" min="1" max="5" class="border rounded-lg p-2 w-20 focus:outline-none focus:border-black">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Comment</label>
                <textarea [(ngModel)]="newComment" name="comment" class="border rounded-2xl p-3 w-full focus:outline-none focus:border-black" rows="3" placeholder="Tell us about the fabric, fit, and vibe."></textarea>
              </div>
              <button type="submit" class="btn-primary rounded-full px-6">Submit review</button>
            </form>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">You may like</p>
              <h3 class="text-xl font-black mt-1">Recommended</h3>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <app-product-card *ngFor="let rp of recommended" [product]="rp"></app-product-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  reviews: Review[] = [];
  recommended: Product[] = [];
  quantity = 1;
  selectedImage = 0;
  newRating = 5;
  newComment = '';

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private prodService: ProdService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.get(id).subscribe(p => this.product = p);
    this.productService.reviews(id).subscribe(r => this.reviews = r as Review[]);
    this.prodService.list({ size: 3 }).subscribe(page => this.recommended = page.content);
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.add(this.product.id, this.quantity).subscribe();
  }

  submitReview() {
    if (!this.product) return;
    this.productService.addReview(this.product.id, { rating: this.newRating, comment: this.newComment }).subscribe(() => {
      this.productService.reviews(this.product!.id).subscribe(r => this.reviews = r as Review[]);
      this.newComment = '';
    });
  }
}
