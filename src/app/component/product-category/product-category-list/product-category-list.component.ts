import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Productcategory,
  ResponseProductCategory,
} from 'src/app/model/productcategory';
import { ProductCategoryService } from 'src/app/service/product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css'],
})
export class ProductCategoryListComponent implements OnInit {
  subjectKeyup = new Subject<any>();
  productCategorys?: Productcategory[];
  productCategoryDelete?: Productcategory;
  pc?: Productcategory;
  keySearch?: string = '';
  orderNameDesc?: boolean = false;
  orderNameAsc?: boolean = false;
  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalProductCategorys = 0;

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategory(this.currentPage - 1, this.pageSize.value);

    this.subjectKeyup
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.findAllByNameContaining(
          d,
          this.currentPage - 1,
          this.pageSize.value
        );
      });
  }

  public onOpenModalLoad(productCategory: Productcategory) {
    this.productCategoryService
      .getProductCategoryById(productCategory.id)
      .subscribe(
        (response: Productcategory) => {
          let link = '/product-category-manager/edit/' + productCategory.id;
          this.router.navigate([link]);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.pc = productCategory;
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

  public onOpenModalDetail(productCategory: Productcategory) {
    this.productCategoryService
      .getProductCategoryById(productCategory.id)
      .subscribe(
        (response: Productcategory) => {
          let link = '/product-category-manager/detail/' + productCategory.id;
          this.router.navigate([link]);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.pc = productCategory;
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

  public onOpenModal(productCategory: Productcategory): void {
    this.productCategoryService
      .getProductCategoryById(productCategory.id)
      .subscribe(
        (response: Productcategory) => {
          this.productCategoryDelete = response;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#deleteProductCategoryModal');
          container?.appendChild(button);
          button.click();
        },
        (error: HttpErrorResponse) => {
          console.log(error.status);
          if (error.status === 404) {
            this.pc = productCategory;
            const container = document.getElementById('main-container');
            const button = document.createElement('button');
            button.type = 'button';
            button.style.display = 'none';
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#loadPage');
            container?.appendChild(button);
            button.click();
          }
          if (error.status === 405) {
            this.productCategoryDelete = productCategory;
            this.showToastrErrorDelete();
          }
        }
      );
  }

  public deleteProductCategory(productCategoryDeleteId: number | undefined) {
    this.productCategoryService
      .deleteProductCategory(productCategoryDeleteId)
      .subscribe(
        (response: void) => {
          this.getAllProductCategory(this.currentPage - 1, this.pageSize.value);
          this.showToastrError();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getAllProductCategory(currentPage: number, pageSize: number): void {
    this.productCategoryService
      .getAllProductCategory(currentPage, pageSize)
      .subscribe(
        (response: ResponseProductCategory) => {
          this.productCategorys = response.content;
          this.totalProductCategorys = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
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
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getAllProductCategory(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.findAllByNameContaining(
          this.keySearch,
          this.currentPage - 1,
          this.pageSize.value
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
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getAllProductCategory(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.findAllByNameContaining(
          this.keySearch,
          this.currentPage - 1,
          this.pageSize.value
        );
      }
    }
  }

  onSearch($event: any) {
    let value = $event.target.value;
    if (value === '') {
      this.getAllProductCategory(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  public findAllByNameContaining(
    search: any,
    currentPage: number,
    pageSize: number
  ) {
    console.log(search);
    this.orderNameDesc = false;
    this.orderNameAsc = false;
    this.productCategoryService
      .findAllByNameContaining(search, currentPage, pageSize)
      .pipe(debounceTime(10000))
      .subscribe(
        (response: ResponseProductCategory) => {
          this.productCategorys = response.content;
          this.totalProductCategorys = response.totalElements;
          console.log(this.productCategorys);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public findByDeletedIsFalseOrderByNameDesc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameDesc = true;
    this.orderNameAsc = false;
    this.productCategoryService
      .findByDeletedIsFalseOrderByNameDesc(currentPage, pageSize)
      .subscribe(
        (response: ResponseProductCategory) => {
          console.log(response);
          this.productCategorys = response.content;
          this.totalProductCategorys = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public findByDeletedIsFalseOrderByNameAsc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameAsc = true;
    this.orderNameDesc = false;
    this.productCategoryService
      .findByDeletedIsFalseOrderByNameAsc(currentPage, pageSize)
      .subscribe(
        (response: ResponseProductCategory) => {
          console.log(response);
          this.productCategorys = response.content;
          this.totalProductCategorys = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  showToastrError() {
    this.toastr.error(
      this.productCategoryDelete?.name + ' đã bị xóa',
      'error',
      {
        timeOut: 2000,
        progressBar: true,
      }
    );
  }

  showToastrErrorDelete() {
    this.toastr.error(
      'bạn phải xóa sản phẩm thuộc loại ' +
        this.productCategoryDelete?.name +
        ' trước khi xóa',
      'error',
      {
        timeOut: 2000,
        progressBar: true,
      }
    );
  }
}
