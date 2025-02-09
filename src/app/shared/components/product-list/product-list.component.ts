import { Component, Input, NgModule } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    imports: [CommonModule, ProductCardComponent],
})
export class ProductListComponent {
    @Input() products: Product[] = [];

    constructor() { }
}
