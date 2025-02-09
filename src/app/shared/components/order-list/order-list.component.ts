import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../core/models/order.model';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    imports: [CommonModule],
})
export class OrderListComponent {
    @Input() orders: Order[] = [];

    getTotalPrice(order: Order): number {
        return order.productos.reduce((total, producto) => total + parseFloat(producto.precio) * producto.pivot.cantidad, 0);
    }
}
