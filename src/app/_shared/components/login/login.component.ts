import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageServiceService } from 'src/app/service/token-storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, DoCheck {
  formLogin!: FormGroup;
  loginDTO!: Login;
  isLogger: boolean = false;
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageServiceService
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
  }

  ngDoCheck() {
    if (!this.tokenStorage.getToken() && !this.tokenStorage.isAuthenticated()) {
      return (this.isLogged = true);
    } else {
      return (this.isLogged = false);
    }
  }

  createFormLogin() {
    this.formLogin = this.formBuilder.group({
      username: [],
      password: [],
    });
  }

  login() {
    this.authService.login(this.formLogin.value).subscribe(
      (response: any) => {
        const { access_token } = response;
        this.tokenStorage.setToken(access_token);
        const jwtData = access_token.split('.')[1];
        console.log(window.atob(jwtData));
        this.loginDTO = JSON.parse(window.atob(jwtData));
        this.tokenStorage.setUserName(this.loginDTO.sub);
        this.tokenStorage.setAuthorities(this.loginDTO.role);
        this.router.navigate(['bill-manager']);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.isLogger = true;
        }
      }
    );
  }
}
