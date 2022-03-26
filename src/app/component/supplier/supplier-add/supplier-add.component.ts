import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utility } from 'src/app/customvalidator/utility';
import { ExceptionResponse, Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css'],
})
export class SupplierAddComponent implements OnInit {
  supplier?: Supplier;
  supplierError?: Supplier;
  formAddSupplier!: FormGroup;
  exceptionResponse!: ExceptionResponse;
  submited?: boolean = false;
  id!: number;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phoneNumberPattern = '(84|0[3|5|7|8|9])+([0-9]{9})';

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.createFormAdd();
    this.formAddSupplier.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  public createFormAdd() {
    this.formAddSupplier = this.formBuilder.group({
      supplierName: [
        '',
        [
          this.utility.requiredValidator('tên nhà cung cấp'),
          this.utility.minlengthValidator('tên nhà cung cấp', 2),
          this.utility.maxlengthValidator('tên nhà cung cấp', 30),
        ],
      ],
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
  }

  public get f() {
    return this.formAddSupplier.controls;
  }

  public addSupplier(form: FormGroup): void {
    this.supplierService.saveSupplier(form.value).subscribe(
      (response: Supplier) => {
        this.router.navigate(['/supplier-manager']);
        this.showToastrSuccess();
        this.submited = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.supplierError = error.error;
          this.submited = true;
          console.log(this.supplierError);
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
    this.toastr.success('* thêm mới nhà cung cấp thành công', 'success', {
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
