import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-charcoal text-white py-10 px-6 mt-10">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
        <div>
          <div class="text-2xl font-bold mb-2">UrbanCart.ai</div>
          <p class="text-sm text-gray-300">AI-powered fashion discovery for modern India.</p>
        </div>
        <div class="text-sm text-gray-300">© {{ year }} UrbanCart.ai</div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
