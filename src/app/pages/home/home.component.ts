import { Component } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { Product } from '../../core/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [ProductListComponent, SliderComponent],
})
export class HomeComponent {
    products: Product[] = [];

    constructor(private http: HttpClient) { }


    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.http.get<Product[]>(`${environment.API_URL}productos`).subscribe({
            next: (data: Product[]) => {
                this.products = data;
            },
            error: (error) => {
                console.error('Error fetching products:', error);
            }
        });
    }
}
