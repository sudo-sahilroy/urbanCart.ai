import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { LoginComponent } from './features/auth/login.component';
import { SignupComponent } from './features/auth/signup.component';
import { ProductDetailComponent } from './features/product/product-detail.component';
import { CartPageComponent } from './features/cart/cart-page.component';
import { CheckoutPageComponent } from './features/checkout/checkout-page.component';
import { OrdersPageComponent } from './features/orders/orders-page.component';
import { ProfilePageComponent } from './features/profile/profile-page.component';
import { AiSearchPageComponent } from './features/ai-search/ai-search-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: 'ai-search', component: AiSearchPageComponent },
  { path: '**', redirectTo: '' }
];
