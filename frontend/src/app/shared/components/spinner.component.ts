import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<div class="flex justify-center items-center py-10"><div class="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>`
})
export class SpinnerComponent {}
