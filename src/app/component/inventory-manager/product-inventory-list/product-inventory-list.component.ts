import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  CustomResultImportBillAndProduct,
  ImportBillPagination,
} from 'src/app/model/import-bill';
import { ImportBillService } from 'src/app/service/import-bill.service';
import { CustomResultBill, BillPagination } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-product-inventory-list',
  templateUrl: './product-inventory-list.component.html',
  styleUrls: ['./product-inventory-list.component.css'],
})
export class ProductInventoryListComponent implements OnInit {
  customResultImportBillAndProduct?: CustomResultImportBillAndProduct[];
  customResultBill?: CustomResultBill[];
  customResult?: CustomResultImportBillAndProduct;

  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  listPageSizeBill = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalElements = 0;

  pageSizeBill = this.listPageSizeBill[0];
  currentPageBill = 1;
  ordinalNumberBill = this.currentPage * this.pageSize.value;
  totalElementsBill = 0;

  constructor(
    private importBillService: ImportBillService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.findAllQuantityAndTotalProduct(
      this.currentPage - 1,
      this.pageSize.value
    );
    this.countQuantityAndTotalProduct();

    this.findQuantityAndTotalBill(
      this.currentPageBill - 1,
      this.pageSizeBill.value
    );
  }

  findAllQuantityAndTotalProduct(currentPage: number, pageSize: number) {
    this.importBillService
      .findQuantityAndTotalProduct(currentPage, pageSize)
      .subscribe(
        (response: ImportBillPagination) => {
          this.customResultImportBillAndProduct = response.content;
          this.totalElements = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  findQuantityAndTotalBill(currentPage: number, pageSize: number) {
    this.billService
      .findQuantityAndTotalProduct(currentPage, pageSize)
      .subscribe(
        (res: BillPagination) => {
          this.customResultBill = res.content;
          this.totalElementsBill = res.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  changePageSizeBill(value: any) {
    this.pageSizeBill = value;
    this.currentPageBill = 1;
    this.findAllQuantityAndTotalProduct(
      this.currentPageBill - 1,
      this.pageSizeBill.value
    );
  }

  changePageBill() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSizeBill.value;
    this.findAllQuantityAndTotalProduct(
      this.currentPageBill - 1,
      this.pageSizeBill.value
    );
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    this.findAllQuantityAndTotalProduct(
      this.currentPage - 1,
      this.pageSize.value
    );
  }

  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    this.findAllQuantityAndTotalProduct(
      this.currentPage - 1,
      this.pageSize.value
    );
  }

  countQuantityAndTotalProduct() {
    this.importBillService.countQuantityAndTotalImportBill().subscribe(
      (response: CustomResultImportBillAndProduct) => {
        this.customResult = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
