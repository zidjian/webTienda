import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'producto/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
