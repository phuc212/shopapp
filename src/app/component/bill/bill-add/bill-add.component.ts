import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { BillError } from 'src/app/model/bill';
import { BillDetail } from 'src/app/model/bill-detail';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BillService } from 'src/app/service/bill.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.css'],
})
export class BillAddComponent implements OnInit {
  products?: Product[];
  product?: Product;
  billError?: BillError;
  billDetails?: BillDetail[] = [];
  users?: User[];
  formBillDetail!: FormGroup;
  formBill!: FormGroup;
  submited: boolean = false;
  quantityProduct?: number;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createFromBillDetails();
    this.createFromBill();
    this.listProduct();
    this.listUsers();
    this.formBillDetail.valueChanges.subscribe(() => {
      this.findProductByName(
        this.formBillDetail.get('product')?.get('name')?.value
      );

      this.submited = false;
    });
    this.formBill.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  createFromBill() {
    this.formBill = this.formBuilder.group({
      userId: [0],
      createdDate: [
        '',
        Validators.compose([
          DateValidator.dateVaidator,
          DateValidator.dateMin,
          DateValidator.dateFormat,
        ]),
      ],
      billDetails: [],
    });
  }

  get fB() {
    return this.formBill.controls;
  }

  createFromBillDetails() {
    this.formBillDetail = this.formBuilder.group({
      product: this.formBuilder.group({
        name: [''],
      }),
      quantity: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(1000000000),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(14),
        ]),
      ],
    });
  }

  get fBD() {
    return this.formBillDetail.controls;
  }

  handelChangePrice(event: any) {
    this.formBillDetail.patchValue(
      {
        price: this.currencyPipe.transform(
          this.formBillDetail
            .get('price')
            ?.value.replace(/\D/g, '')
            .replace(/^0+/, ''),
          'VND'
        ),
      },
      { emitEvent: false, onlySelf: true }
    );
  }

  addBillDetail(form: FormGroup) {
    const billDetailList = this.billDetails?.filter(
      (bd) =>
        bd.product.name ==
        this.formBillDetail.get('product')?.get('name')?.value
    );
    if (billDetailList?.length != 0) {
      this.showToastrError();
    } else {
      if (this.product!.quantity < this.formBillDetail.get('quantity')?.value) {
        return this.showToastrQuantityError();
      } else {
        form
          .get('price')
          ?.setValue(form.get('price')?.value.replace(/\D/g, ''));
        console.log(form.value);
        this.billDetails?.push(form.value);
        this.formBill.get('billDetails')?.setValue(this.billDetails);
        console.log(this.formBill.value);
      }
    }
  }

  removebillDetail(productName: string) {
    const newImportBillDetails = this.billDetails?.filter(
      (billDetail) => billDetail.product.name != productName
    );
    this.billDetails = newImportBillDetails;
    this.formBill.get('billDetails')?.setValue(this.billDetails);
    console.log(this.formBill.get('billDetails')?.value);
  }

  addBill(form: FormGroup) {
    const formData = new FormData();
    formData.append('bill', JSON.stringify(form.value));
    this.billService.saveBill(formData).subscribe(
      (response: any) => {
        this.redirectList();
        this.showToastrSuccess();
      },
      (error: HttpErrorResponse) => {
        this.billError = error.error;
        this.submited = true;
        console.log(this.billError);
      }
    );
  }

  findProductByName(name: string | undefined) {
    this.productService.findProductByName(name).subscribe(
      (response: Product) => {
        this.product = response;
        this.quantityProduct = response.quantity;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  listProduct() {
    this.productService.findAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  listUsers() {
    this.userService.getListUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  redirectList() {
    this.router.navigate(['bill-manager']);
  }

  showToastrError() {
    this.toastr.error('* sản phẩm đã tồn tại trong đơn hàng', 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrQuantityError() {
    this.toastr.error(
      '* số lượng sản phẩm trong kho chỉ còn ' + this.product?.quantity,
      'error',
      {
        timeOut: 2000,
        progressBar: true,
      }
    );
  }

  showToastrSuccess() {
    this.toastr.success(`* tạo hóa đơn thành công`, 'success', {
      timeOut: 2000,
      progressBar: true,
    });
  }
}
