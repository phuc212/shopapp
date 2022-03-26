import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CustomResultImportBillAndProduct,
  ImportBill,
  ImportBillPagination,
} from '../model/import-bill';

@Injectable({
  providedIn: 'root',
})
export class ImportBillService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllImportBill(
    currentPage: number,
    pageSize: number
  ): Observable<ImportBillPagination> {
    return this.http.get<ImportBillPagination>(
      `${this.apiServiceUrl}/api/import-bill/${currentPage}/${pageSize}`
    );
  }

  public saveImportBill(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiServiceUrl}/api/import-bill/add`,
      formData
    );
  }
  public editImportBill(formData: FormData): Observable<any> {
    return this.http.patch<any>(
      `${this.apiServiceUrl}/api/import-bill/edit`,
      formData
    );
  }

  public findById(importBillId: number | undefined): Observable<ImportBill> {
    return this.http.get<ImportBill>(
      `${this.apiServiceUrl}/api/import-bill/${importBillId}`
    );
  }

  public findAllByUserFullNameContaining(
    fullName: string | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<ImportBillPagination> {
    return this.http.get<ImportBillPagination>(
      `${this.apiServiceUrl}/api/import-bill/${fullName}/${currentPage}/${pageSize}`
    );
  }

  public deleteImportBill(importBillId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/api/import-bill/delete/${importBillId}`
    );
  }

  public findQuantityAndTotalProduct(
    currentPage: number,
    pageSize: number
  ): Observable<ImportBillPagination> {
    return this.http.get<ImportBillPagination>(
      `${this.apiServiceUrl}/api/import-bill/find-quantity-and-total/${currentPage}/${pageSize}`
    );
  }

  public countQuantityAndTotalImportBill(): Observable<CustomResultImportBillAndProduct> {
    return this.http.get<CustomResultImportBillAndProduct>(
      `${this.apiServiceUrl}/api/import-bill/count-quantity-total`
    );
  }

  public findByProductId(
    productId: number | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<ImportBillPagination> {
    return this.http.get<ImportBillPagination>(
      `${this.apiServiceUrl}/api/import-bill/find-by-product-id/${productId}/${currentPage}/${pageSize}`
    );
  }
}
