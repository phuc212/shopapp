import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServiceUrl}/api/roles`);
  }
}
