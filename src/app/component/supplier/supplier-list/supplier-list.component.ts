import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductPagination } from 'src/app/model/product';
import { Supplier, SupplierPagination } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  subjectKeyup = new Subject<any>();
  suppliers?: Supplier[];
  supplierDelete?: Supplier;
  supplierIsDelete?: Supplier;
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
  totalSuppliers = 0;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSuppliers(this.currentPage - 1, this.pageSize.value);
    this.subjectKeyup.pipe(debounceTime(1000)).subscribe((d) => {
      this.findAllByNameContaining(
        d,
        this.currentPage - 1,
        this.pageSize.value
      );
    });
  }

  public getSuppliers(currentPage: number, pageSize: number): void {
    this.supplierService
      .getSuppliers(currentPage, pageSize)
      .subscribe((response: SupplierPagination) => {
        this.suppliers = response.content;
        this.totalSuppliers = response.totalElements;
        (error: HttpErrorResponse) => {
          alert(error.message);
        };
      });
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
        this.getSuppliers(this.currentPage - 1, this.pageSize.value);
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
        this.getSuppliers(this.currentPage - 1, this.pageSize.value);
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

  public openModalLoad(supplier: Supplier) {
    this.supplierService.getSupplierById(supplier.id).subscribe(
      (response: Supplier) => {
        let link = '/supplier-manager/edit/' + supplier.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.supplierDelete = supplier;
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

  public onOpenModalDetail(supplier: Supplier) {
    this.supplierService.getSupplierById(supplier.id).subscribe(
      (response: Supplier) => {
        let link = '/supplier-manager/detail/' + supplier.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.supplierDelete = supplier;
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

  public onOpenModal(supplier: Supplier): void {
    this.supplierService.getSupplierById(supplier.id).subscribe(
      (response: Supplier) => {
        this.supplierDelete = response;
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#deleteSupplierModal');
        container?.appendChild(button);
        button.click();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.supplierIsDelete = supplier;
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

  public deleteSupplier(supplierId: number | undefined) {
    this.supplierService.deleteSupplier(supplierId).subscribe(
      (response: void) => {
        this.getSuppliers(this.currentPage - 1, this.pageSize.value);
        this.showToastrError();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if (value === '') {
      this.getSuppliers(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  public findAllByNameContaining(
    search: string | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameDesc = false;
    this.orderNameAsc = false;
    this.supplierService
      .findByNameContaining(search, currentPage, pageSize)
      .subscribe(
        (response: SupplierPagination) => {
          this.suppliers = response.content;
          this.totalSuppliers = response.totalElements;
          console.log(this.suppliers);
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
    this.supplierService
      .orderBySupplierNameDesc(currentPage, pageSize)
      .subscribe(
        (response: ProductPagination) => {
          console.log(response);
          this.suppliers = response.content;
          this.totalSuppliers = response.totalElements;
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
    this.supplierService
      .orderBySupplierNameAsc(currentPage, pageSize)
      .subscribe(
        (response: SupplierPagination) => {
          this.suppliers = response.content;
          this.totalSuppliers = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  showToastrError() {
    this.toastr.error(
      this.supplierDelete?.supplierName + ' đã bị xóa',
      'error',
      {
        timeOut: 2000,
        progressBar: true,
      }
    );
  }
}
