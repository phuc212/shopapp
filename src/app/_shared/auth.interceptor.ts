import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenStorageServiceService } from '../service/token-storage-service.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private tokenService: TokenStorageServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.getToken()) {
      request = this.addTokenHeader(request, this.tokenService.getToken());
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !request.url.includes('/login') &&
          err.status === 403
        ) {
          return this.handel403Error(request, next);
        }
        return throwError(err);
      })
    );
  }

  private handel403Error(request: HttpRequest<any>, next: HttpHandler) {
    this.router.navigate(['']);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          const { access_token } = token;
          this.isRefreshing = false;
          this.refreshTokenSubject.next(access_token);

          return next.handle(this.addTokenHeader(request, access_token));
        }),
        catchError((err) => {
          this.isRefreshing = false;

          this.tokenService.logOut();
          return throwError(err);
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string | null) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
