import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  template: `
    <section class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-100 text-slate-900">
      <div class="absolute -top-24 -left-20 h-80 w-80 bg-orange-300 blur-[140px] opacity-60"></div>
      <div class="absolute -bottom-16 -right-10 h-72 w-72 bg-indigo-200 blur-[120px] opacity-70"></div>
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 items-center py-20 px-6 gap-12 relative">
        <div class="space-y-6">
          <p class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            UrbanCart.ai
            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </p>
          <h1 class="text-5xl md:text-6xl font-black leading-tight">Style signals decoded by AI.</h1>
          <p class="text-lg text-slate-700 max-w-xl">Discover silhouettes, textures, and fits curated by Gemini intelligence. Fast drops, Indian street energy, zero scroll fatigue.</p>
          <div class="flex flex-wrap gap-3">
            <a routerLink="/ai-search" class="btn-primary bg-gradient-to-r from-black via-slate-900 to-orange-500 hover:shadow-2xl hover:-translate-y-0.5 transition-transform">Try AI Search</a>
            <a routerLink="/cart" class="px-5 py-3 border border-slate-900 uppercase tracking-wide rounded-full bg-white hover:bg-slate-900 hover:text-white transition">View Cart</a>
          </div>
          <div class="flex items-center gap-4 text-sm text-slate-700">
            <span class="px-3 py-1 rounded-full bg-white/70 backdrop-blur">New: Metallic street sets</span>
            <span class="px-3 py-1 rounded-full bg-white/70 backdrop-blur">Ships pan-India</span>
          </div>
        </div>
        <div class="relative h-[420px]">
          <div class="absolute inset-0 rounded-[32px] bg-gradient-to-br from-slate-900 via-black to-orange-500 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"></div>
          <div class="absolute -left-6 top-10 h-16 w-16 rounded-full bg-white/80 blur-2xl"></div>
          <div class="absolute right-8 -bottom-4 h-24 w-24 rounded-full bg-orange-300/70 blur-2xl"></div>
          <img src="https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-[28px] shadow-xl border border-white/10" alt="Hero model">
          <div class="absolute left-4 bottom-6 bg-white/80 backdrop-blur-lg text-slate-900 px-4 py-2 rounded-full text-xs font-semibold shadow-md">Gemini curated · 2.4s</div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto py-14 px-6 space-y-10">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Featured drops</p>
          <h2 class="text-3xl md:text-4xl font-black mt-2">Trending now, no algorithm fatigue</h2>
        </div>
        <div class="flex flex-wrap gap-2 text-sm">
          <button (click)="filterCategory('')" [class]="pillClass(!category)">All</button>
          <button (click)="filterCategory('Men')" [class]="pillClass(category==='Men')">Men</button>
          <button (click)="filterCategory('Women')" [class]="pillClass(category==='Women')">Women</button>
          <button (click)="filterCategory('Accessories')" [class]="pillClass(category==='Accessories')">Accessories</button>
        </div>
      </div>

      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <app-product-card *ngFor="let p of products" [product]="p"></app-product-card>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-black text-white shadow-lg">
          <p class="text-sm uppercase tracking-wide text-white/70">AI curation</p>
          <p class="text-lg font-semibold mt-2">Combines Gemini signals with shopper intent to surface only what matters.</p>
        </div>
        <div class="p-5 rounded-2xl bg-white shadow-lg border border-slate-100">
          <p class="text-sm uppercase tracking-wide text-slate-500">Made for India</p>
          <p class="text-lg font-semibold mt-2">Fits and price points tuned for Indian streetwear and everyday luxe.</p>
        </div>
        <div class="p-5 rounded-2xl bg-gradient-to-r from-orange-100 via-white to-amber-50 border border-orange-100">
          <p class="text-sm uppercase tracking-wide text-orange-600">Fast drops</p>
          <p class="text-lg font-semibold mt-2">New edits weekly. Zero doomscroll. Add, checkout, done.</p>
        </div>
      </div>
    </section>
  `,
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  category = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetch();
  }

  filterCategory(cat: string) {
    this.category = cat;
    this.fetch();
  }

  pillClass(active: boolean) {
    return [
      'px-4 py-2 rounded-full border transition',
      active
        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
    ].join(' ');
  }

  private fetch() {
    this.productService.list({ size: 12, category: this.category || undefined }).subscribe(page => {
      this.products = page.content;
    });
  }
}
