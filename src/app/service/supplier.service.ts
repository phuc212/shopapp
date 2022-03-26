import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier, SupplierPagination } from '../model/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSuppliers(
    currentPage: number,
    pageSize: number
  ): Observable<SupplierPagination> {
    return this.http.get<SupplierPagination>(
      `${this.apiServiceUrl}/api/suppliers/${currentPage}/${pageSize}`
    );
  }

  public findByNameContaining(
    search: string | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<SupplierPagination> {
    return this.http.get<SupplierPagination>(
      `${this.apiServiceUrl}/api/suppliers/${search}/${currentPage}/${pageSize}`
    );
  }

  public orderBySupplierNameDesc(
    currentPage: number,
    pageSize: number
  ): Observable<SupplierPagination> {
    return this.http.get<SupplierPagination>(
      `${this.apiServiceUrl}/api/suppliers/order-by-supplier-name-desc/${currentPage}/${pageSize}`
    );
  }

  public orderBySupplierNameAsc(
    currentPage: number,
    pageSize: number
  ): Observable<SupplierPagination> {
    return this.http.get<SupplierPagination>(
      `${this.apiServiceUrl}/api/suppliers/order-by-supplier-name-asc/${currentPage}/${pageSize}`
    );
  }

  public getListSuppplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(
      `${this.apiServiceUrl}/api/suppliers/all-list`
    );
  }

  public saveSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(
      `${this.apiServiceUrl}/api/suppliers/add`,
      supplier
    );
  }

  public getSupplierById(id: number | undefined): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiServiceUrl}/api/suppliers/${id}`);
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.patch<Supplier>(
      `${this.apiServiceUrl}/api/suppliers/edit`,
      supplier
    );
  }

  public deleteSupplier(supplierId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/api/suppliers/delete/${supplierId}`
    );
  }
}
