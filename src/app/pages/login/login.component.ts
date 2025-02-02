import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule]
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Handle form submission
    }
  }
}
