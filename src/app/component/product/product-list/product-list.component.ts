import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product, ProductPag, ProductPagination } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageServiceService } from 'src/app/service/token-storage-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, DoCheck {
  subjectKeyup = new Subject<any>();
  products?: ProductPag[];
  productDelete?: ProductPag;
  keySearch?: string = '';
  orderNameDesc: boolean = false;
  orderNameAsc: boolean = false;
  images: any = [];
  roles!: string[];
  isAdmin: boolean = false;

  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageServiceService
  ) {}

  ngOnInit(): void {
    this.getProducts(this.currentPage - 1, this.pageSize.value);
    this.subjectKeyup.pipe(debounceTime(1000)).subscribe((d) => {
      this.getProductsByName(this.currentPage - 1, this.pageSize.value, d);
    });
  }

  ngDoCheck() {
    this.roles = JSON.parse(sessionStorage.getItem('AuthAuthorities') || '[]');
    console.log(this.roles);
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getProducts(currentPage: number, pageSize: number): void {
    this.productService
      .getAll(currentPage, pageSize)
      .subscribe((response: ProductPagination) => {
        this.products = response.content;
        this.totalProducts = response.totalElements;
        (error: HttpErrorResponse) => {
          alert(error.message);
        };
      });
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if (value === '') {
      this.getProducts(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  public getProductsByName(
    currentPage: number,
    pageSize: number,
    search: string | undefined
  ): void {
    console.log(search);
    this.orderNameDesc = false;
    this.orderNameAsc = false;
    this.productService
      .getProductsByName(currentPage, pageSize, search)
      .subscribe(
        (response: ProductPagination) => {
          this.products = response.content;
          this.totalProducts = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    if (this.keySearch?.trim() === '') {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeleteIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getProducts(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeleteIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getProductsByName(
          this.currentPage - 1,
          this.pageSize.value,
          this.keySearch
        );
      }
    }
  }
  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    if (this.keySearch?.trim() === '') {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeleteIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getProducts(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeleteIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getProductsByName(
          this.currentPage - 1,
          this.pageSize.value,
          this.keySearch
        );
      }
    }
  }

  public findByDeletedIsFalseOrderByNameAsc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameAsc = true;
    this.orderNameDesc = false;
    this.productService.sortProductsByNameAsc(currentPage, pageSize).subscribe(
      (response: ProductPagination) => {
        this.products = response.content;
        this.totalProducts = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public findByDeleteIsFalseOrderByNameDesc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameDesc = true;
    this.orderNameAsc = false;
    this.productService.sortProductsByNameDesc(currentPage, pageSize).subscribe(
      (response: ProductPagination) => {
        this.products = response.content;
        this.totalProducts = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModalLoad(product: ProductPag) {
    this.productService.getProductById(product.id).subscribe(
      (response: Product) => {
        let link = '/product-manager/edit/' + product.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.productDelete = product;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#loadPage');
          container?.appendChild(button);
          button.click();
        }
      }
    );
  }

  public openModalDelete(product: ProductPag): void {
    this.productService.getProductById(product.id).subscribe(
      (response: Product) => {
        this.productDelete = product;
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#deleteProductModal');
        container?.appendChild(button);
        button.click();
      },
      (error: HttpErrorResponse) => {
        this.productDelete = product;
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#loadPage');
        container?.appendChild(button);
        button.click();
      }
    );
  }

  checkAllCheckBox(ev: any) {
    this.products?.forEach((x) => (x.checked = ev.target.checked));
  }

  allCheckBoxChecked() {
    return this.products?.every((p) => p.checked);
  }

  public openDeleteProducts() {
    const selectedProducts = this.products
      ?.filter((product) => product.checked)
      .map((p) => p.id);
    if (selectedProducts && selectedProducts.length > 0) {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#deleteProductsModal');
      container?.appendChild(button);
      button.click();
    } else {
      this.showToastrWarnDeleteMultiple();
    }
  }

  public deleteProducts() {
    const selectedProducts = this.products
      ?.filter((product) => product.checked)
      .map((p) => p.id);
    this.productService.deleteProducts(selectedProducts).subscribe(
      (response: void) => {
        this.showToastrSuccessDeleteMultiple();
        this.getProducts(this.currentPage - 1, this.pageSize.value);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalDetail(product: ProductPag) {
    this.productService.getProductById(product.id).subscribe(
      (response: Product) => {
        let link = '/product-manager/detail/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.productDelete = product;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#loadPage');
          container?.appendChild(button);
          button.click();
        }
      }
    );
  }

  public deleteProduct(productId: number | undefined) {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        this.getProducts(this.currentPage - 1, this.pageSize.value);
        this.showToastrError();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showToastrError() {
    this.toastr.error(this.productDelete?.name + ' đã bị xóa', 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrWarnDeleteMultiple() {
    this.toastr.warning('vui lòng chọn sản phẩm bạn muốn xóa', 'warn', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrSuccessDeleteMultiple() {
    this.toastr.success('xóa thành công', 'success', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  getImage(productId: number) {
    return '' + productId;
  }
}
