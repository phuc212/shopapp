import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BillDetail } from '../model/bill-detail';

@Injectable({
  providedIn: 'root',
})
export class BillDetailService {
  apiUrlService = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllByBillId(billId: number | undefined): Observable<BillDetail[]> {
    return this.http.get<BillDetail[]>(
      `${this.apiUrlService}/api/bill-detail/list/${billId}`
    );
  }
}
