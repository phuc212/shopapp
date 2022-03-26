import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { Bill, BillError } from 'src/app/model/bill';
import { BillDetail } from 'src/app/model/bill-detail';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BillDetailService } from 'src/app/service/bill-detail.service';
import { BillService } from 'src/app/service/bill.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.css'],
})
export class BillEditComponent implements OnInit {
  formBill!: FormGroup;
  id?: number;
  billDetails?: BillDetail[] = [];
  users?: User[];
  products?: Product[];
  billError?: BillError;
  submited: boolean = false;
  errorImportBillDetail: boolean = false;
  product?: Product;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private productService: ProductService,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createFormBill(this.id);
    this.getAllUsers();
    this.getAllProducts();
    this.getAllBillDetailByBillId(this.id);
  }

  createFormBill(idImportBill: number | undefined) {
    this.formBill = this.formBuilder.group({
      id: [],
      userId: [0, Validators.required],
      billDetails: [Validators.required],
      createdDate: [
        '',
        Validators.compose([
          DateValidator.dateVaidator,
          DateValidator.dateMin,
          DateValidator.dateFormat,
        ]),
      ],
    });
    this.billService.findById(idImportBill).subscribe((response: Bill) => {
      this.formBill.patchValue(response);
      this.formBill
        .get('createdDate')
        ?.patchValue(this.formatDate(response.createdDate));
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

  public get fB() {
    return this.formBill.controls;
  }

  getAllBillDetailByBillId(billId: number | undefined) {
    this.billDetailService
      .getAllByBillId(billId)
      .subscribe((response: BillDetail[]) => {
        this.billDetails = response;
        this.formBill.get('billDetails')?.patchValue(response);
      });
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

  findProductByName(name: string | undefined) {
    this.productService.findProductByName(name).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  handelChangeQuantity(
    importBillDetailId: number,
    e: number,
    productName: string
  ) {
    let element = document.getElementById('quantity' + importBillDetailId);
    let submitForm = document.getElementById('submitForm');
    this.findProductByName(productName);
    if (this.product?.quantity && this.product.quantity < e) {
      this.showToastrError();
    }
    if (e < 1 || e > 1000000000) {
      element?.style.setProperty('display', 'inline');
      submitForm?.setAttribute('disabled', 'disabled');
    } else {
      element?.style.setProperty('display', 'none');
      submitForm?.removeAttribute('disabled');
    }
    const newBillDetails = this.billDetails?.map((importBillDetail) => {
      if (importBillDetail.id === importBillDetailId) {
        importBillDetail.quantity = +e;
        return importBillDetail;
      }
      return importBillDetail;
    });
    this.billDetails = newBillDetails;
    this.formBill.get('billDetails')?.setValue(this.billDetails);
    console.log(this.formBill.get('billDetails')?.value);
  }

  handelChangePrice(billDetailId: number, e: any) {
    let element = document.getElementById('price' + billDetailId);
    let submitForm = document.getElementById('submitForm');
    if (e < 1 || e > 1000000000) {
      element?.style.setProperty('display', 'inline');
      submitForm?.setAttribute('disabled', 'disabled');
    } else {
      element?.style.setProperty('display', 'none');
    }
    const newBillDetails = this.billDetails?.map((billDetail) => {
      if (billDetail.id === billDetailId) {
        billDetail.price = +e;
        return billDetail;
      }
      return billDetail;
    });
    this.billDetails = newBillDetails;
    this.formBill.get('billDetails')?.setValue(this.billDetails);
    console.log(this.formBill.get('billDetails')?.value);
  }

  addImportBill() {
    const formData = new FormData();
    console.log(this.formBill.value);
    formData.append('bill', JSON.stringify(this.formBill.value));
    this.billService.updateBill(formData).subscribe(
      (response: void) => {
        this.showToastrSuccess();
        this.redirectList();
      },
      (error: HttpErrorResponse) => {
        this.submited = true;
        this.billError = error.error;
      }
    );
  }

  showToastrSuccess() {
    this.toastr.success('* Chỉnh sửa hóa đơn bán hàng thành công', 'success', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  showToastrError() {
    this.toastr.error(
      '* Số lượng sản phẩm còn trong kho là ' + this.product?.quantity,
      'error',
      {
        timeOut: 3000,
        progressBar: true,
      }
    );
  }

  redirectList() {
    this.router.navigate(['/bill-manager']);
  }
}
