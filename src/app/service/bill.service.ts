import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill, BillPagination } from '../model/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllBill(
    currentPage: number,
    pageSize: number
  ): Observable<BillPagination> {
    return this.http.get<BillPagination>(
      `${this.apiServiceUrl}/api/bills/${currentPage}/${pageSize}`
    );
  }

  getAllByUserName(
    name: string | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<BillPagination> {
    return this.http.get<BillPagination>(
      `${this.apiServiceUrl}/api/bills/${name}/${currentPage}/${pageSize}`
    );
  }

  saveBill(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiServiceUrl}/api/bills/add`, formData);
  }

  findById(billId: number | undefined): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiServiceUrl}/api/bills/${billId}`);
  }

  updateBill(bill: FormData): Observable<void> {
    return this.http.patch<void>(`${this.apiServiceUrl}/api/bills/edit`, bill);
  }

  deleteBill(billId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/api/bills/${billId}`);
  }

  public findQuantityAndTotalProduct(
    currentPage: number,
    pageSize: number
  ): Observable<BillPagination> {
    return this.http.get<BillPagination>(
      `${this.apiServiceUrl}/api/bills/find-quantity-total/${currentPage}/${pageSize}`
    );
  }
}
