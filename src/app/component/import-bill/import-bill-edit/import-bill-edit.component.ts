import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImportBill, ImportBillError } from 'src/app/model/import-bill';
import { ImportBillDetail } from 'src/app/model/import-bill-detail';
import { Product } from 'src/app/model/product';
import { Supplier } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { ImportBillDetailService } from 'src/app/service/import-bill-detail.service';
import { ImportBillService } from 'src/app/service/import-bill.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { UserService } from 'src/app/service/user.service';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-import-bill-edit',
  templateUrl: './import-bill-edit.component.html',
  styleUrls: ['./import-bill-edit.component.css'],
})
export class ImportBillEditComponent implements OnInit {
  formImportBill!: FormGroup;
  id?: number;
  importBilldetails?: ImportBillDetail[] = [];
  suppliers?: Supplier[];
  users?: User[];
  products?: Product[];
  importBillError?: ImportBillError;
  submited: boolean = false;
  errorImportBillDetail: boolean = false;

  listPageSize = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalImportBillDetails = 0;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private userService: UserService,
    private productService: ProductService,
    private importBillService: ImportBillService,
    private importBillDetailService: ImportBillDetailService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createFormImportBill(this.id);
    this.getAllSuppliers();
    this.getAllUsers();
    this.getAllProducts();
    this.getAllImportBillDetailByimportBillId(this.id);
  }

  createFormImportBill(idImportBill: number | undefined) {
    this.formImportBill = this.formBuilder.group({
      id: [],
      supplierId: [0, Validators.required],
      userId: [0, Validators.required],
      importBillDetails: [Validators.required],
      createdDate: [
        '',
        Validators.compose([
          DateValidator.dateVaidator,
          DateValidator.dateMin,
          DateValidator.dateFormat,
        ]),
      ],
    });
    this.importBillService
      .findById(idImportBill)
      .subscribe((response: ImportBill) => {
        this.formImportBill.patchValue(response);
        this.formImportBill
          .get('createdDate')
          ?.patchValue(this.formatDate(response.createDate));
      });
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  public get fIB() {
    return this.formImportBill.controls;
  }

  getAllImportBillDetailByimportBillId(importBillId: number | undefined) {
    this.importBillDetailService
      .findByImportBillId(importBillId)
      .subscribe((response: ImportBillDetail[]) => {
        this.importBilldetails = response;
        this.formImportBill.get('importBillDetails')?.patchValue(response);
      });
  }

  getAllSuppliers() {
    this.supplierService.getListSuppplier().subscribe(
      (response: Supplier[]) => {
        this.suppliers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllUsers() {
    this.userService.getListUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllProducts() {
    this.productService.findAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  handelChangeQuantity(importBillDetailId: number, e: number) {
    let element = document.getElementById('quantity' + importBillDetailId);
    let submitForm = document.getElementById('submitForm');
    if (e < 1 || e > 1000000000) {
      element?.style.setProperty('display', 'inline');
      submitForm?.setAttribute('disabled', 'disabled');
    } else {
      element?.style.setProperty('display', 'none');
      submitForm?.removeAttribute('disabled');
    }
    const newImportBillDetails = this.importBilldetails?.map(
      (importBillDetail) => {
        if (importBillDetail.id === importBillDetailId) {
          importBillDetail.quantity = +e;
          return importBillDetail;
        }
        return importBillDetail;
      }
    );
    this.importBilldetails = newImportBillDetails;
    this.formImportBill
      .get('importBillDetails')
      ?.setValue(this.importBilldetails);
    console.log(this.formImportBill.get('importBillDetails')?.value);
  }

  handelChangePrice(importBillDetailId: number, e: any) {
    let element = document.getElementById('price' + importBillDetailId);
    let submitForm = document.getElementById('submitForm');
    if (e < 1 || e > 1000000000) {
      element?.style.setProperty('display', 'inline');
      submitForm?.setAttribute('disabled', 'disabled');
    } else {
      element?.style.setProperty('display', 'none');
    }
    const newImportBillDetails = this.importBilldetails?.map(
      (importBillDetail) => {
        if (importBillDetail.id === importBillDetailId) {
          importBillDetail.price = +e;
          return importBillDetail;
        }
        return importBillDetail;
      }
    );
    this.importBilldetails = newImportBillDetails;
    this.formImportBill
      .get('importBillDetails')
      ?.setValue(this.importBilldetails);
    console.log(this.formImportBill.get('importBillDetails')?.value);
  }

  addImportBill(form: FormGroup) {
    const formData = new FormData();
    console.log(form.value);
    formData.append('import-bill', JSON.stringify(form.value));
    this.importBillService.editImportBill(formData).subscribe(
      (response: any) => {
        this.showToastrSuccess();
        this.redirectList();
      },
      (error: HttpErrorResponse) => {
        this.importBillError = error.error;
        this.submited = true;
        console.log(this.importBillError);
      }
    );
  }

  showToastrSuccess() {
    this.toastr.success('* Chỉnh sửa phiếu nhập thành công', 'success', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  showToastrError() {
    this.toastr.error('* sản phẩm đã tồn tại trong phiếu nhập', 'error', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  redirectList() {
    this.router.navigate(['/import-bill-manager']);
  }
}
