import { Component } from '@angular/core';
import { Signal } from "@angular/core";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {
  showPassword = false;

  constructor(private fb: FormBuilder) {}

  adminLoginForm = this.fb.group({
    adminUsername: ['', [Validators.required, Validators.minLength(2)]],
    adminPassword: ['', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]]
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    console.log('Initial form state:', {
      dirty: this.adminLoginForm.dirty,
      pristine: this.adminLoginForm.pristine,
      valid: this.adminLoginForm.valid,
      nameControl: {
        invalid: this.adminLoginForm.get('adminUsername')?.invalid,
        dirty: this.adminLoginForm.get('adminUsername')?.dirty,
        touched: this.adminLoginForm.get('adminUsername')?.touched
      }
    });
  }

  onSubmit(): void {
    console.log('form submitted', 
      this.adminLoginForm.value
    )
  }
}
