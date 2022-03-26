import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css'],
})
export class SupplierDetailComponent implements OnInit {
  id?: number;
  formEditSupplier!: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formEditSupplier = this.formBuilder.group({
      id: [0],
      supplierName: [''],
      email: [''],
      address: [''],
      phoneNumber: [''],
    });
    if (this.id !== 0) {
      this.supplierService
        .getSupplierById(this.id)
        .subscribe((response: Supplier) => {
          this.formEditSupplier.patchValue(response);
        });
    }
  }

  public redirectList() {
    this.router.navigate(['/supplier-manager']);
  }
}
