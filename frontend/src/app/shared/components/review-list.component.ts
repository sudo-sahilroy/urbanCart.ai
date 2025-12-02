import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars.component';
import { Review } from '../../core/models/review.model';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent],
  template: `
    <div class="space-y-4">
      <div *ngFor="let review of reviews" class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div class="font-semibold">{{ review.userName }}</div>
          <app-rating-stars [rating]="review.rating"></app-rating-stars>
        </div>
        <p class="text-sm text-gray-700">{{ review.comment }}</p>
        <p class="text-xs text-gray-400">{{ review.createdAt | date:'medium' }}</p>
      </div>
    </div>
  `
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];
}
