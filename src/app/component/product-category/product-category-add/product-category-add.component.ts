import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { Productcategory } from 'src/app/model/productcategory';
import { ExceptionResponse } from 'src/app/model/supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Utility } from 'src/app/customvalidator/utility';

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.component.html',
  styleUrls: ['./product-category-add.component.css'],
})
export class ProductCategoryAddComponent implements OnInit {
  productCategory?: Productcategory;
  productCategoryError?: Productcategory;
  fromAddProductCategory!: FormGroup;
  exceptionResponse!: ExceptionResponse;
  submited?: boolean = false;
  id!: number;

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.createFormAdd();
    this.fromAddProductCategory.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  public createFormAdd() {
    this.fromAddProductCategory = this.formBuilder.group({
      name: [
        '',
        [
          this.utility.requiredValidator('tên loại sản phẩm'),
          this.utility.minlengthValidator('tên loại sản phẩm', 2),
          this.utility.maxlengthValidator('tên loại sản phẩm', 30),
        ],
      ],
      description: [
        '',
        [this.utility.requiredValidator('thông tin loại sản phẩm')],
      ],
    });
  }

  public get f() {
    return this.fromAddProductCategory.controls;
  }

  public addProductCategory(form: FormGroup): void {
    this.productCategoryService.addProductCategory(form.value).subscribe(
      (response: Productcategory) => {
        this.router.navigate(['/product-category-manager']);
        this.showToastrSuccess();
        this.submited = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.productCategoryError = error.error;
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
    this.router.navigate(['/product-category-manager']);
  }

  showToastrSuccess() {
    this.toastr.success('* thêm mới loại sản phẩm thành công', 'success', {
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
