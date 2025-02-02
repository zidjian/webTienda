import { Component, NgModule } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, ProductCardComponent],
})
export class ProductListComponent {
  products = [
    { id: '1', name: 'Producto 1', price: 100, image: 'producto.webp', rating: 4.5 },
    { id: '2', name: 'Producto 2', price: 200, image: 'producto.webp', rating: 4.0 },
    { id: '3', name: 'Producto 3', price: 300, image: 'producto.webp', rating: 3.5 },
    { id: '4', name: 'Producto 4', price: 400, image: 'producto.webp', rating: 5.0 },
    { id: '5', name: 'Producto 5', price: 500, image: 'producto.webp', rating: 4.2 },
    { id: '6', name: 'Producto 6', price: 600, image: 'producto.webp', rating: 4.8 },
    { id: '7', name: 'Producto 7', price: 700, image: 'producto.webp', rating: 3.9 },
    { id: '8', name: 'Producto 8', price: 800, image: 'producto.webp', rating: 4.7 },
    { id: '9', name: 'Producto 9', price: 900, image: 'producto.webp', rating: 4.1 },
    { id: '10', name: 'Producto 10', price: 1000, image: 'producto.webp', rating: 4.9 },
  ];
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductListComponent,
  ],
})
export class ProductListModule { }
