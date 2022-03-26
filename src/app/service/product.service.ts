import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductPagination } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAll(
    currentPage: number,
    pageSize: number
  ): Observable<ProductPagination> {
    return this.http.get<ProductPagination>(
      `${this.apiServiceUrl}/api/products/${currentPage}/${pageSize}`
    );
  }

  public sortProductsByNameDesc(
    currentPage: number,
    pageSize: number
  ): Observable<ProductPagination> {
    return this.http.get<ProductPagination>(
      `${this.apiServiceUrl}/api/products/sort-by-name-desc/${currentPage}/${pageSize}`
    );
  }

  public sortProductsByNameAsc(
    currentPage: number,
    pageSize: number
  ): Observable<ProductPagination> {
    return this.http.get<ProductPagination>(
      `${this.apiServiceUrl}/api/products/sort-by-name-asc/${currentPage}/${pageSize}`
    );
  }

  public getProductsByName(
    currentPage: number,
    pageSize: number,
    name: string | undefined
  ): Observable<ProductPagination> {
    return this.http.get<ProductPagination>(
      `${this.apiServiceUrl}/api/products/${name}/${currentPage}/${pageSize}`
    );
  }

  public getAllByProductCategoryId(
    id: number | undefined,
    currentPage: number,
    pageSize: number
  ): Observable<ProductPagination> {
    return this.http.get<ProductPagination>(
      `${this.apiServiceUrl}/api/products/all-by-product-category-id/${id}/${currentPage}/${pageSize}`
    );
  }

  public findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiServiceUrl}/api/products/all-list`
    );
  }

  public saveProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiServiceUrl}/api/products/add`,
      formData
    );
  }

  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiServiceUrl}/api/products/${productId}`
    );
  }

  public updateProduct(formData: FormData): Observable<any> {
    return this.http.patch<any>(
      `${this.apiServiceUrl}/api/products/edit`,
      formData
    );
  }

  public deleteProduct(productId: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/api/products/delete/${productId}`
    );
  }

  public findProductByName(name: string | undefined): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiServiceUrl}/api/products/find-by-name/${name}`
    );
  }

  public deleteProducts(ids: number[] | undefined): Observable<void> {
    return this.http.post<void>(
      `${this.apiServiceUrl}/api/products/delete-multiple`,
      ids
    );
  }
}
