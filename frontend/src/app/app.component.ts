import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar.component';
import { FooterComponent } from './layouts/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-beige">
      <app-navbar></app-navbar>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {}
