import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-3">
      <button class="px-3 py-1 bg-gray-200" (click)="change(-1)">-</button>
      <span class="w-8 text-center">{{ value }}</span>
      <button class="px-3 py-1 bg-gray-200" (click)="change(1)">+</button>
    </div>
  `
})
export class QuantitySelectorComponent {
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  change(delta: number) {
    const next = Math.max(1, this.value + delta);
    this.value = next;
    this.valueChange.emit(next);
  }
}
