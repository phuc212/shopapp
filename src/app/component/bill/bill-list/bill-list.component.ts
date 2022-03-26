import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Bill, BillPagination } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css'],
})
export class BillListComponent implements OnInit {
  subjectKeyup = new Subject<any>();
  bills?: Bill[];
  billDelete?: Bill;
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
  totalBill = 0;

  constructor(
    private billService: BillService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllBill(this.currentPage - 1, this.pageSize.value);
    this.subjectKeyup.pipe(debounceTime(1000)).subscribe((d) => {
      this.findByUserName(d, this.currentPage - 1, this.pageSize.value);
    });
  }

  public getAllBill(currentPage: number, pageSize: number): void {
    this.billService
      .getAllBill(currentPage, pageSize)
      .subscribe((response: BillPagination) => {
        this.bills = response.content;
        this.totalBill = response.totalElements;
        (error: HttpErrorResponse) => {
          alert(error.message);
        };
      });
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    this.getAllBill(this.currentPage - 1, this.pageSize.value);
  }

  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    this.getAllBill(this.currentPage - 1, this.pageSize.value);
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if (value === '') {
      this.getAllBill(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  findByUserName(
    name: string | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.billService.getAllByUserName(name, currentPage, pageSize).subscribe(
      (response: BillPagination) => {
        this.bills = response.content;
        this.totalBill = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openModalDetail(bill: Bill) {
    this.billService.findById(bill.id).subscribe(
      (response: Bill) => {
        let link = '/bill-manager/detail/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.billDelete = bill;
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

  openModalDeleted(item: Bill) {
    this.billService.findById(item.id).subscribe(
      (response: Bill) => {
        this.billDelete = item;
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
        this.billDelete = item;
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

  openModalEdit(bill: Bill) {
    this.billService.findById(bill.id).subscribe(
      (response: Bill) => {
        let link = '/bill-manager/edit/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        this.billDelete = bill;
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

  deleteBill(billId: number | undefined) {
    this.billService.deleteBill(billId).subscribe(
      (response: void) => {
        this.showToastrError();
        this.getAllBill(this.currentPage - 1, this.pageSize.value);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showToastrError() {
    this.toastrService.error('xóa hóa đơn thành công', 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }
}
