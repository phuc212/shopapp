import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ImportBill, ImportBillPagination } from 'src/app/model/import-bill';
import { ImportBillService } from 'src/app/service/import-bill.service';

@Component({
  selector: 'app-import-bill-list',
  templateUrl: './import-bill-list.component.html',
  styleUrls: ['./import-bill-list.component.css'],
})
export class ImportBillListComponent implements OnInit {
  subjectKeyup = new Subject<any>();
  importBills?: ImportBill[];
  importBillDelete?: ImportBill;
  keySearch?: string = '';

  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalImportBill = 0;

  constructor(
    private importBillService: ImportBillService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllImportBill(this.currentPage - 1, this.pageSize.value);
    this.subjectKeyup.pipe(debounceTime(1000)).subscribe((d) => {
      this.findByUserFullNameContaining(
        d,
        this.currentPage - 1,
        this.pageSize.value
      );
    });
  }

  public getAllImportBill(currentPage: number, pageSize: number): void {
    this.importBillService
      .getAllImportBill(currentPage, pageSize)
      .subscribe((response: ImportBillPagination) => {
        this.importBills = response.content;
        this.totalImportBill = response.totalElements;
        (error: HttpErrorResponse) => {
          alert(error.message);
        };
      });
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    if (this.keySearch?.trim() === '') {
      this.getAllImportBill(this.currentPage - 1, this.pageSize.value);
    } else {
      this.findByUserFullNameContaining(
        this.keySearch,
        this.currentPage - 1,
        this.pageSize.value
      );
    }
  }

  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    if (this.keySearch?.trim() === '') {
      this.getAllImportBill(this.currentPage - 1, this.pageSize.value);
    } else {
      this.findByUserFullNameContaining(
        this.keySearch,
        this.currentPage - 1,
        this.pageSize.value
      );
    }
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if (value === '') {
      this.getAllImportBill(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  findByUserFullNameContaining(
    fullName: string | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.importBillService
      .findAllByUserFullNameContaining(fullName, currentPage, pageSize)
      .subscribe(
        (response: ImportBillPagination) => {
          this.importBills = response.content;
          this.totalImportBill = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  onOpenModalEdit(importBill: ImportBill) {
    this.importBillService.findById(importBill.id).subscribe(
      (response: ImportBill) => {
        let link = '/import-bill-manager/edit/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.importBillDelete = importBill;
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

  onOpenModalDetail(importBill: ImportBill) {
    this.importBillService.findById(importBill.id).subscribe(
      (response: ImportBill) => {
        let link = '/import-bill-manager/detail/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.importBillDelete = importBill;
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

  public openModalDelete(importBill: ImportBill): void {
    this.importBillService.findById(importBill.id).subscribe(
      (response: ImportBill) => {
        this.importBillDelete = importBill;
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
        this.importBillDelete = importBill;
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

  public deleteImportBill(importBillId: number | undefined) {
    this.importBillService.deleteImportBill(importBillId).subscribe(
      (response: void) => {
        this.getAllImportBill(this.currentPage - 1, this.pageSize.value);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
