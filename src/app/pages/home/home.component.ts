import { Component } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { SliderComponent } from '../../shared/components/slider/slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    ProductListComponent,
    SliderComponent
  ]
})
export class HomeComponent {
}
