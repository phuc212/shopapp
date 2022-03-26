import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { Utility } from 'src/app/customvalidator/utility';
import { Product } from 'src/app/model/product';
import { Productcategory } from 'src/app/model/productcategory';
import { ExceptionResponse, Supplier } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  product?: Product;
  productError?: Product;
  productCategories?: Productcategory[];
  suppliers?: Supplier[];
  users?: User[];
  formAddProduct!: FormGroup;
  exceptionResponse!: ExceptionResponse;
  submited?: boolean = false;
  image?: any = null;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.createFormProduct();
    this.getAllProductCategory();
    this.formAddProduct.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  private createFormProduct() {
    this.formAddProduct = this.formBuilder.group({
      name: [
        '',
        [
          this.utility.requiredValidator('tên sản phẩm'),
          this.utility.minlengthValidator('tên sản phẩm', 10),
          this.utility.maxlengthValidator('tên sản phẩm', 50),
        ],
      ],
      description: ['', [this.utility.requiredValidator('thông tin sản phẩm')]],
      imageUrl: ['', [this.utility.requiredValidator('ảnh sản phẩm')]],
      price: [
        ,
        [
          this.utility.minValidator('giá sản phẩm', 1),
          this.utility.maxValidator('giá sản phẩm', 1000000000),
        ],
      ],
      productCategoryId: [0, Validators.min(1)],
    });
  }

  public get f() {
    return this.formAddProduct.controls;
  }

  public selectFile(e: any) {
    this.image = e.target.files[0];
    this.formAddProduct.get('imageUrl')?.setValue(e.target.files[0].name);
  }

  public getAllProductCategory() {
    this.productCategoryService.getListProductCategory().subscribe(
      (response: Productcategory[]) => {
        this.productCategories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addProduct(form: FormGroup): void {
    console.log(JSON.stringify(form.value));
    const formData = new FormData();
    formData.append('product', JSON.stringify(form.value));
    if (this.image === null) {
      formData.append(
        'file',
        new Blob([JSON.stringify({}, null)], { type: 'application/json' })
      );
    } else {
      formData.append('file', this.image);
    }
    this.productService.saveProduct(formData).subscribe(
      (response: Product) => {
        this.createFormProduct();
        this.router.navigate(['/product-manager']);
        this.showToastrSuccess();
        this.submited = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.productError = error.error;
          console.log(this.productError);
          this.submited = true;
        } else {
          this.exceptionResponse = error.error;
          this.showToastrError();
          this.submited = true;
        }
      }
    );
  }

  public redirectList() {
    this.router.navigate(['/product-manager']);
  }

  showToastrSuccess() {
    this.toastr.success('thêm sản phẩm thành công', 'success', {
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
