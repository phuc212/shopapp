import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {
  Productcategory,
  ResponseProductCategory,
} from '../model/productcategory';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllProductCategory(
    currentPage: number,
    pageSize: number
  ): Observable<ResponseProductCategory> {
    return this.http.get<ResponseProductCategory>(
      `${this.apiServiceUrl}/api/product-categories/${currentPage}/${pageSize}`
    );
  }

  public getListProductCategory(): Observable<Productcategory[]> {
    return this.http.get<Productcategory[]>(
      `${this.apiServiceUrl}/api/product-categories/all-list`
    );
  }

  public findByDeletedIsFalseOrderByNameDesc(
    currentPage: number,
    pageSize: number
  ): Observable<ResponseProductCategory> {
    return this.http.get<ResponseProductCategory>(
      `${this.apiServiceUrl}/api/product-categories/order-by-name-desc/${currentPage}/${pageSize}`
    );
  }

  public findByDeletedIsFalseOrderByNameAsc(
    currentPage: number,
    pageSize: number
  ): Observable<ResponseProductCategory> {
    return this.http.get<ResponseProductCategory>(
      `${this.apiServiceUrl}/api/product-categories/order-by-name-asc/${currentPage}/${pageSize}`
    );
  }

  public findAllByNameContaining(
    name: string | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<ResponseProductCategory> {
    return this.http.get<ResponseProductCategory>(
      `${this.apiServiceUrl}/api/product-categories/${name}/${currentPage}/${pageSize}`
    );
  }

  public addProductCategory(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiServiceUrl}/api/product-categories/add`,
      formData
    );
  }

  public getProductCategoryById(
    productId: number | undefined
  ): Observable<Productcategory> {
    return this.http.get<Productcategory>(
      `${this.apiServiceUrl}/api/product-categories/${productId}`
    );
  }

  public updateProductCategory(formData: FormData): Observable<any> {
    return this.http.patch<any>(
      `${this.apiServiceUrl}/api/product-categories/edit`,
      formData
    );
  }

  public deleteProductCategory(
    productId: number | undefined
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/api/product-categories/delete/${productId}`
    );
  }
}
