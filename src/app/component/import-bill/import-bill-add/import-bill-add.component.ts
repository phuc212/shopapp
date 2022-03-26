import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImportBillError } from 'src/app/model/import-bill';
import { ImportBillDetail } from 'src/app/model/import-bill-detail';
import { Product } from 'src/app/model/product';
import { Supplier } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { ImportBillService } from 'src/app/service/import-bill.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { UserService } from 'src/app/service/user.service';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-import-bill-add',
  templateUrl: './import-bill-add.component.html',
  styleUrls: ['./import-bill-add.component.css'],
})
export class ImportBillAddComponent implements OnInit {
  formImportBill!: FormGroup;
  formImportBillDetail!: FormGroup;
  importBilldeatils?: ImportBillDetail[] = [];
  suppliers?: Supplier[];
  users?: User[];
  products?: Product[];
  importBillError?: ImportBillError;
  submited: boolean = false;
  priceVND?: string | null = '0';

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private userService: UserService,
    private productService: ProductService,
    private importBillService: ImportBillService,
    private toastr: ToastrService,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.createFormImportBill();
    this.createFromImportBillDetail();
    this.getAllSuppliers();
    this.getAllUsers();
    this.getAllProducts();
    this.formImportBillDetail.valueChanges.subscribe(
      () => (this.submited = false)
    );
  }

  handelChangePrice(event: any) {
    this.formImportBillDetail.patchValue(
      {
        price: this.currencyPipe.transform(
          this.formImportBillDetail
            .get('price')
            ?.value.replace(/\D/g, '')
            .replace(/^0+/, ''),
          'VND'
        ),
      },
      { emitEvent: false, onlySelf: true }
    );
    console.log(this.formImportBillDetail.get('price')?.value);
  }

  createFormImportBill() {
    this.formImportBill = this.formBuilder.group({
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
  }

  public get fIB() {
    return this.formImportBill.controls;
  }

  createFromImportBillDetail() {
    this.formImportBillDetail = this.formBuilder.group({
      product: this.formBuilder.group({
        name: [],
      }),
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(14),
        ]),
      ],
      quantity: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(1000000000),
        ]),
      ],
    });
    console.log(this.formImportBillDetail.value);
  }

  public get fIBD() {
    return this.formImportBillDetail.controls;
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

  addImportBillDetail(form: FormGroup) {
    const importBillDetail = this.importBilldeatils?.filter(
      (ibd) =>
        ibd.product.name ==
        this.formImportBillDetail.get('product')?.get('name')?.value
    );
    if (importBillDetail?.length != 0) {
      this.showToastrError();
    } else {
      form.get('price')?.setValue(form.get('price')?.value.replace(/\D/g, ''));
      this.importBilldeatils?.push(form.value);
      console.log(this.importBilldeatils);
      this.formImportBill
        .get('importBillDetails')
        ?.setValue(this.importBilldeatils);
      console.log(this.formImportBill.get('importBillDetails')?.value);
    }
  }

  removeImportBillDetail(productName: string) {
    const newImportBillDetails = this.importBilldeatils?.filter(
      (importBillDetail) => importBillDetail.product.name != productName
    );
    this.importBilldeatils = newImportBillDetails;
    this.formImportBill
      .get('importBillDetails')
      ?.setValue(this.importBilldeatils);
    console.log(this.formImportBill.get('importBillDetails')?.value);
  }

  addImportBill(form: FormGroup) {
    const formData = new FormData();
    console.log(form.value);
    formData.append('import-bill', JSON.stringify(form.value));
    this.importBillService.saveImportBill(formData).subscribe(
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
    this.toastr.success('* tạo phiếu nhập thành công', 'success', {
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
