import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { Product } from '../../core/models/product.model';
import { SpinnerComponent } from '../../shared/components/spinner.component';

@Component({
  selector: 'app-ai-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, SpinnerComponent],
  template: `
    <div class="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-500/50 to-transparent blur-2xl opacity-70"></div>
      <div class="absolute -bottom-20 -right-10 h-72 w-72 bg-orange-400/60 blur-[120px]"></div>
      <div class="absolute -top-16 -left-16 h-64 w-64 bg-indigo-500/40 blur-[120px]"></div>

      <div class="max-w-6xl mx-auto py-14 px-6 relative space-y-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div class="space-y-3 max-w-3xl">
            <p class="text-xs uppercase tracking-[0.3em] text-white/70">Gemini powered</p>
            <h1 class="text-4xl md:text-5xl font-black leading-tight">Describe your vibe, we surface the fit.</h1>
            <p class="text-white/70 text-lg">Ask in natural language. Layer price, occasion, fabric, and attitude—UrbanCart translates it to a curated drop.</p>
          </div>
          <div class="px-4 py-3 rounded-full bg-white/10 backdrop-blur flex items-center gap-2 text-sm">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live recommendations under 3s
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] space-y-4">
          <form (ngSubmit)="search()" class="flex flex-col md:flex-row gap-3">
            <input [(ngModel)]="query" name="query" class="flex-1 border border-white/20 bg-white/5 text-white placeholder:text-white/60 p-4 rounded-2xl focus:border-orange-400 focus:outline-none" placeholder="“Build a monochrome airport look under Rs 2500”">
            <button class="btn-primary bg-gradient-to-r from-orange-400 via-amber-500 to-rose-500 hover:shadow-lg rounded-2xl px-6" type="submit">Search</button>
          </form>
          <div class="flex flex-wrap gap-3">
            <button *ngFor="let prompt of samplePrompts" (click)="usePrompt(prompt)" class="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 hover:border-orange-400 transition">
              {{ prompt }}
            </button>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
        <div *ngIf="!loading && results.length" class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <app-product-card *ngFor="let p of results" [product]="p"></app-product-card>
        </div>
        <div *ngIf="!loading && !results.length" class="text-white/70 text-sm">No results yet. Try a prompt to get started.</div>
      </div>
    </div>
  `
})
export class AiSearchPageComponent {
  query = '';
  results: Product[] = [];
  loading = false;
  samplePrompts = [
    'Oversized black tee with neon graphic under Rs 1200',
    'Minimal tan sneakers for office casual',
    'Satin co-ord for a night out, Rs 3000 budget',
    'Layered street look with a light jacket, monsoon ready'
  ];
  constructor(private ai: AiService) {}

  search() {
    this.loading = true;
    this.ai.recommend(this.query).subscribe(res => {
      this.results = res.recommendations;
      this.loading = false;
    }, () => this.loading = false);
  }

  usePrompt(prompt: string) {
    this.query = prompt;
    this.search();
  }
}
