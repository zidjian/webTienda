import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { getPrerenderParams, ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'iniciar-sesion', component: LoginComponent },
    { path: 'productos', component: ProductsComponent },
    {
        path: 'producto/:id',
        component: ProductDetailComponent,
        data: { getPrerenderParams },
    },
    { path: 'carrito-compras', component: CartComponent },
    {
        path: 'finalizar-compra', component: CheckoutComponent,
        canActivate: [AuthGuard],
    },
    { path: 'ordenes', component: OrdersComponent },
    { path: '**', redirectTo: '' },
];
