import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserPagination } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUser(
    currentPage: number,
    pageSize: number
  ): Observable<UserPagination> {
    return this.http.get<UserPagination>(
      `${this.apiServiceUrl}/api/users/${currentPage}/${pageSize}`
    );
  }

  public findByNameContaining(
    fullName: string | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<UserPagination> {
    return this.http.get<UserPagination>(
      `${this.apiServiceUrl}/api/users/${fullName}/${currentPage}/${pageSize}`
    );
  }

  public orderByFullNameDesc(
    currentPage: number,
    pageSize: number
  ): Observable<UserPagination> {
    return this.http.get<UserPagination>(
      `${this.apiServiceUrl}/api/users/order-by-full-name-desc/${currentPage}/${pageSize}`
    );
  }

  public orderByFullNameAsc(
    currentPage: number,
    pageSize: number
  ): Observable<UserPagination> {
    return this.http.get<UserPagination>(
      `${this.apiServiceUrl}/api/users/order-by-full-name-asc/${currentPage}/${pageSize}`
    );
  }

  public getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServiceUrl}/api/users/all-list`);
  }

  public getUserById(userId: number | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiServiceUrl}/api/users/${userId}`);
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServiceUrl}/api/users/add`, user);
  }

  public updateUser(user: User): Observable<void> {
    return this.http.patch<void>(`${this.apiServiceUrl}/api/users/edit`, user);
  }

  public deleteUser(userId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/api/users/${userId}`);
  }
}
