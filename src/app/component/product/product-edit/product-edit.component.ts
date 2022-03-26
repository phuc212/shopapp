import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { Productcategory } from 'src/app/model/productcategory';
import { ExceptionResponse, Supplier } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { ToastrService } from 'ngx-toastr';
import { Utility } from 'src/app/customvalidator/utility';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productError?: Product;
  submited?: boolean = false;
  exceptionResponse?: ExceptionResponse;
  formEditProduct!: FormGroup;
  productCategories?: Productcategory[];
  id!: number;
  image?: any = null;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private utility: Utility
  ) {}

  ngOnInit(): void {
    this.eidtFormProduct();
    this.getAllProductCategory();
    this.formEditProduct.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  private eidtFormProduct() {
    this.id = this.route.snapshot.params['id'];
    this.formEditProduct = this.formBuilder.group({
      id: [],
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
    if (this.id !== 0) {
      this.productService
        .getProductById(this.id)
        .subscribe((response: Product) => {
          console.log(response);
          this.formEditProduct.patchValue(response);
          this.formEditProduct
            .get('importDate')
            ?.patchValue(this.formatDate(response.importDate));
          console.log(this.formEditProduct.value);
        });
    }
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

  public get f() {
    return this.formEditProduct.controls;
  }

  public selectFile(e: any) {
    this.image = e.target.files[0];
    this.formEditProduct.get('imageUrl')?.setValue(e.target.files[0].name);
  }

  public editProduct(form: FormGroup): void {
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
    this.productService.updateProduct(formData).subscribe(
      (response: Product) => {
        this.submited = false;
        this.redirectList();
        this.showToastrSuccess();
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.productError = error.error;
          this.submited = true;
        } else {
          this.exceptionResponse = error.error;
          this.submited = true;
          this.showToastrError();
        }
      }
    );
  }

  showToastrSuccess() {
    this.toastrService.success('* chỉnh sửa sản phẩm thành công', 'success', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrError() {
    this.toastrService.error(this.exceptionResponse?.message, 'error', {
      timeOut: 2000,
      progressBar: true,
    });
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

  public redirectList() {
    this.router.navigate(['/product-manager']);
  }
}
