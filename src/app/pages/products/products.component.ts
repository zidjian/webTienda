import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../core/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    imports: [CommonModule, ProductListComponent],
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(() => {
            this.getProducts();
        });
    }

    getProducts(): void {
        const queryParam = this.route.snapshot.queryParamMap.get('name') || 'laptop';
        this.http.get<Product[]>(`${environment.API_URL}productos?query=${queryParam}`).subscribe({
            next: (data: Product[]) => {
                this.products = data;
            },
            error: (error) => {
                console.error('Error fetching products:', error);
            }
        });
    }
}
