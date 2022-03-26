import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utility } from 'src/app/customvalidator/utility';
import { Productcategory } from 'src/app/model/productcategory';
import { ExceptionResponse } from 'src/app/model/supplier';
import { ProductCategoryService } from 'src/app/service/product-category.service';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrls: ['./product-category-edit.component.css'],
})
export class ProductCategoryEditComponent implements OnInit {
  productCategory?: Productcategory;
  productCategoryError?: Productcategory;
  formEditProductCategory!: FormGroup;
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
    this.formEditProductCategory.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  public createFormAdd() {
    this.id = this.route.snapshot.params['id'];
    this.formEditProductCategory = this.formBuilder.group({
      id: [],
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
    if (this.id != 0) {
      this.productCategoryService
        .getProductCategoryById(this.id)
        .subscribe((response: Productcategory) => {
          this.formEditProductCategory.patchValue(response);
        });
    }
  }

  public get f() {
    return this.formEditProductCategory.controls;
  }

  public addProductCategory(form: FormGroup): void {
    this.productCategoryService.updateProductCategory(form.value).subscribe(
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
    this.toastr.success('* chỉnh sửa loại sản phẩm thành công', 'success', {
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
