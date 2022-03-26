import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginDTO!: Login;

  apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getLoginDTO() {
    return this.loginDTO;
  }

  login(login: Login) {
    return this.http.post(`${this.apiServiceUrl}/login`, login);
  }

  refreshToken() {
    return this.http.get(`${this.apiServiceUrl}/token/refresh`);
  }
}
