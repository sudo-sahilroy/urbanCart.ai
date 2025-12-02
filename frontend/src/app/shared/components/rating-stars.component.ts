import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-1 text-amber-500 text-sm">
      <ng-container *ngFor="let star of stars; let i = index">
        <span>{{ i < rating ? '★' : '☆' }}</span>
      </ng-container>
      <span class="text-xs text-gray-500 ml-1">{{ rating.toFixed(1) }}</span>
    </div>
  `
})
export class RatingStarsComponent {
  @Input() rating = 0;
  stars = Array(5).fill(0);
}
