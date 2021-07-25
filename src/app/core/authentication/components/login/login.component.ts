import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isViewPassEye = false;
  formLogin: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(40)])],
    });
  }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit(): void {
    this.spinner.show();
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.username = this.tokenStorage.getUser().username;
        this.router.navigate(['/home/dashboard']);
        this.spinner.hide();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        this.spinner.hide();
      }
    );
  }

  closeCardErro() {
    if (this.errorMessage !== '') {
      this.errorMessage = '';
    }
  }

  get validUsername() {
    return this.formLogin.get('username');
  }
  get validPassword() {
    return this.formLogin.get('password');
  }
}
