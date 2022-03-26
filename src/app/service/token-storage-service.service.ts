import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageServiceService {
  roles: Array<string> = [];

  constructor(private jwtHelper: JwtHelperService) {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem('AuthAuthorities')) {
      JSON.parse(sessionStorage.getItem('AuthAuthorities') || '[]').forEach(
        (authority: any) => {
          this.roles.push(authority.authority);
        }
      );
    }
    return this.roles;
  }

  public isAuthenticated(): boolean {
    const accessToken = this.getToken() || undefined;
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
