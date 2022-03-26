import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CustomResultImportBillAndProduct,
  ImportBillPagination,
} from 'src/app/model/import-bill';
import { ImportBillService } from 'src/app/service/import-bill.service';

@Component({
  selector: 'app-import-bill-detail-list',
  templateUrl: './import-bill-detail-list.component.html',
  styleUrls: ['./import-bill-detail-list.component.css'],
})
export class ImportBillDetailListComponent implements OnInit {
  customResultImportBill?: CustomResultImportBillAndProduct[];
  id?: number;

  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalElements = 0;

  constructor(
    private importBillService: ImportBillService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.findByProductId(this.id, this.currentPage - 1, this.pageSize.value);
  }

  findByProductId(
    productId: number | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.importBillService
      .findByProductId(productId, currentPage, pageSize)
      .subscribe(
        (response: ImportBillPagination) => {
          this.customResultImportBill = response.content;
          this.totalElements = response.totalElements;
          console.log(this.customResultImportBill);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    this.findByProductId(this.id, this.currentPage - 1, this.pageSize.value);
  }

  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    this.findByProductId(this.id, this.currentPage - 1, this.pageSize.value);
  }

  redirectList() {
    this.router.navigate(['/inventory-manager']);
  }
}
