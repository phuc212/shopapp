import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { BillDetail } from 'src/app/model/bill-detail';
import { BillDetailService } from 'src/app/service/bill-detail.service';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css'],
})
export class BillDetailComponent implements OnInit {
  bill?: Bill;
  id?: number;
  billDetails?: BillDetail[];

  constructor(
    private billService: BillService,
    private billDetailService: BillDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== 0) {
      this.findAllByBillId(this.id);
      this.findBillById(this.id);
    }
  }

  public findAllByBillId(id: number | undefined) {
    this.billDetailService
      .getAllByBillId(id)
      .subscribe((response: BillDetail[]) => {
        this.billDetails = response;
      });
  }

  public findBillById(id: number | undefined) {
    this.billService.findById(id).subscribe(
      (response: Bill) => {
        this.bill = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  redirectList() {
    this.router.navigate(['/bill-manager']);
  }
}
