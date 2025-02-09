import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, RouterModule],
})
export class RegisterComponent {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
        this.initializeForm();
    }

    private initializeForm() {
        this.registerForm = this.fb.group(
            {
                nombres: ['', [Validators.required]],
                apellidos: ['', [Validators.required]],
                correo: ['', [Validators.required, Validators.email]],
                celular: [
                    '',
                    [Validators.required, Validators.pattern(/^[0-9]{9}$/)],
                ],
                contrasena: [
                    '',
                    [Validators.required, Validators.minLength(6)],
                ],
                contrasena_confirmation: [
                    '',
                    [Validators.required, Validators.minLength(6)],
                ],
                nro_documento: [
                    '',
                    [Validators.required, Validators.pattern(/^[0-9]{8}$/)],
                ],
            },
            { validator: this.passwordMatchValidator }
        );
    }

    private passwordMatchValidator(control: AbstractControl) {
        const password = control.get('contrasena');
        const confirmPassword = control.get('contrasena_confirmation');
        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
        ) {
            confirmPassword.setErrors({ mismatch: true });
        } else if (confirmPassword) {
            confirmPassword.setErrors(null);
        }
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const apiUrl = `${environment.API_URL}registro`;
            this.http.post(apiUrl, this.registerForm.value).subscribe({
                next: response => {
                    this.router.navigate(['/iniciar-sesion']);
                },
                error: error => {
                    console.error('Registration failed', error);
                },
            });
        }
    }
}
