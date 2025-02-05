import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environment';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authUrl = environment.API_URL; // URL de autenticación de tu API
    private tokenKey = 'authToken';
    private userKey = 'authUser';
    private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
    authStatus$ = this.authStatus.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private cookieService: CookieService,
        private messageService: MessageService
    ) {
        if (!this.cookieService) {
            throw new Error('CookieService is not initialized');
        }
    }

    login(correo: string, contrasena: string): Observable<any> {
        return this.http
            .post<any>(`${this.authUrl}login`, { correo, contrasena })
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                    this.setUser(response.usuario);
                    this.authStatus.next(true);
                }),
                catchError(error => {
                    return of({ error: 'Usuario y/o contraseña incorrectos' });
                })
            );
    }

    logout(): void {
        this.clearToken();
        this.clearUser();
        this.authStatus.next(false);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getUser(): any {
        const user = this.cookieService
            ? this.cookieService.get(this.userKey)
            : null;
        return user ? JSON.parse(user) : null;
    }

    private setToken(token: string): void {
        if (this.cookieService) {
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 8);
            this.cookieService.set(this.tokenKey, token, expirationDate);
        }
    }

    private getToken(): string | null {
        return this.cookieService
            ? this.cookieService.get(this.tokenKey) || null
            : null;
    }

    private clearToken(): void {
        if (this.cookieService) {
            this.cookieService.delete(this.tokenKey);
        }
    }

    private setUser(user: any): void {
        if (this.cookieService) {
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 8);
            this.cookieService.set(
                this.userKey,
                JSON.stringify(user),
                expirationDate
            );
        }
    }

    private clearUser(): void {
        if (this.cookieService) {
            this.cookieService.delete(this.userKey);
        }
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
