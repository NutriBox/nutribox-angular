import { NgxSpinnerService } from 'ngx-spinner';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fromRegister: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {

    this.fromRegister = fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(40)])],
    });

  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.spinner.show();
    const { username, email, password } = this.fromRegister.value;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
  }

  backLogin() {
    this.router.navigate(['/login']);
  }

  get username() {
    return this.fromRegister.get('username');
  }
  get email() {
    return this.fromRegister.get('email');
  }
  get password() {
    return this.fromRegister.get('password');
  }
}
