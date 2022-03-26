import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportBill } from 'src/app/model/import-bill';
import { ImportBillDetail } from 'src/app/model/import-bill-detail';
import { ImportBillDetailService } from 'src/app/service/import-bill-detail.service';
import { ImportBillService } from 'src/app/service/import-bill.service';

@Component({
  selector: 'app-import-bill-detail',
  templateUrl: './import-bill-detail.component.html',
  styleUrls: ['./import-bill-detail.component.css'],
})
export class ImportBillDetailComponent implements OnInit {
  formimportBillDetail!: FormGroup;
  id?: number;
  importBillDetails?: ImportBillDetail[];

  constructor(
    private importBillService: ImportBillService,
    private importBillDetailService: ImportBillDetailService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formimportBillDetail = this.formBuilder.group({
      id: [0],
      supplier: this.formBuilder.group({
        supplierName: [''],
      }),
      user: this.formBuilder.group({
        fullName: [''],
      }),
      total: [],
    });

    if (this.id !== 0) {
      this.importBillService
        .findById(this.id)
        .subscribe((response: ImportBill) => {
          this.formimportBillDetail.patchValue(response);
          console.log(this.formimportBillDetail.value);
        });
    }
    this.findAllByImportBillId(this.id);
  }

  get f() {
    return this.formimportBillDetail.controls;
  }

  public findAllByImportBillId(id: number | undefined) {
    this.importBillDetailService
      .findByImportBillId(id)
      .subscribe((response: ImportBillDetail[]) => {
        this.importBillDetails = response;
      });
  }

  redirectList() {
    this.router.navigate(['/import-bill-manager']);
  }
}
