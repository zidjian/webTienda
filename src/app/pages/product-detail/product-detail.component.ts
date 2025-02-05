import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    imports: [CurrencyPipe],
})
export class ProductDetailComponent implements OnInit {
    product: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const productId = Number(this.route.snapshot.paramMap.get('id'));
        // Fetch product details using productId
        this.product = {
            id: productId,
            name: 'Product ' + productId,
            price: 100 * (productId || 0),
            rating: 4.5,
            image: 'path/to/image' + productId + '.jpg',
        };
    }
}
