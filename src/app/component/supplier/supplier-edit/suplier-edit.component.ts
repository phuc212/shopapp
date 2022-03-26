import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utility } from 'src/app/customvalidator/utility';
import { ExceptionResponse, Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-suplier-edit',
  templateUrl: './suplier-edit.component.html',
  styleUrls: ['./suplier-edit.component.css'],
})
export class SuplierEditComponent implements OnInit {
  supplier?: Supplier;
  supplierError?: Supplier;
  formEditSupplier!: FormGroup;
  exceptionResponse!: ExceptionResponse;
  submited?: boolean = false;
  id!: number;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phoneNumberPattern =
    '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})';

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.createFormEdit();
    this.formEditSupplier.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  public createFormEdit() {
    this.id = this.route.snapshot.params['id'];
    this.formEditSupplier = this.formBuilder.group({
      id: [0],
      supplierName: ['', [this.utility.requiredValidator('tên nhà cung cấp')]],
      email: [
        '',
        [
          this.utility.requiredValidator('email nhà cung cấp'),
          this.utility.emailValidator('email nhà cung cấp'),
        ],
      ],
      address: ['', [this.utility.requiredValidator('địa chỉ nhà cung cấp')]],
      phoneNumber: [
        '',
        [
          this.utility.requiredValidator('số điện thoại nhà cung cấp'),
          this.utility.phoneNumberValidator('số điện thoại nhà cung cấp'),
        ],
      ],
    });
    if (this.id !== 0) {
      this.supplierService
        .getSupplierById(this.id)
        .subscribe((response: Supplier) => {
          this.formEditSupplier.patchValue(response);
        });
    }
  }

  public get f() {
    return this.formEditSupplier.controls;
  }

  public editSupplier(form: FormGroup): void {
    this.supplierService.updateSupplier(form.value).subscribe(
      (response: Supplier) => {
        this.router.navigate(['/supplier-manager']);
        this.showToastrSuccess();
        this.submited = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.supplierError = error.error;
          this.submited = true;
        } else {
          this.exceptionResponse = error.error;
          this.submited = true;
          this.showToastrError();
        }
      }
    );
  }

  public redirectList() {
    this.router.navigate(['/supplier-manager']);
  }

  showToastrSuccess() {
    this.toastr.success('* chỉnh sửa nhà cung cấp thành công', 'success', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrError() {
    this.toastr.error(this.exceptionResponse.message, 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }
}
