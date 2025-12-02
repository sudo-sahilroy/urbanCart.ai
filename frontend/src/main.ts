import 'zone.js'; // Required for Angular change detection
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withHashLocation()),
    provideAnimations()
  ]
}).catch(err => console.error(err));
