import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OrderListComponent } from '../../shared/components/order-list/order-list.component';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../../environment';
import { Order } from '../../core/models/order.model';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    imports: [OrderListComponent],
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    userId!: string;

    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.userId = this.authService.getUser()?.id;
        if (this.userId) {
            this.getOrders(this.userId);
        }
    }

    getOrders(id: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        this.http.get<any[]>(`${environment.API_URL}ordenes/cliente/${id}`, { headers }).subscribe({
            next: data => {
                this.orders = data;
            },
            error: error => {
                console.error('Error fetching orders:', error);
            }
        });
    }
}
