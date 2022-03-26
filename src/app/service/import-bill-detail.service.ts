import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ImportBillDetail,
  ImportBillDetailPagination,
} from '../model/import-bill-detail';

@Injectable({
  providedIn: 'root',
})
export class ImportBillDetailService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public findByImportBillId(
    importBillId: number | undefined
  ): Observable<ImportBillDetail[]> {
    return this.http.get<ImportBillDetail[]>(
      `${this.apiServiceUrl}/api/import-bill-detail/by-import-bill-id/${importBillId}`
    );
  }
}
