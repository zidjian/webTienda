import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, RouterModule],
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeForm();
    }

    private initializeForm() {
        this.loginForm = this.fb.group({
            correo: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                ],
            ],
            contrasena: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { correo, contrasena } = this.loginForm.value;
            this.authService.login(correo, contrasena).subscribe(
                success => this.router.navigate(['/']),
                error => alert('Login failed')
            );
        }
    }
}
