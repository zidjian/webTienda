import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule, ProductCardComponent]
})
export class ProductsComponent implements OnInit {
  products = [
    // Example products
    { id: 1, name: 'Product 1', price: 100, rating: 4.5, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Product 2', price: 200, rating: 4.0, image: 'path/to/image2.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
