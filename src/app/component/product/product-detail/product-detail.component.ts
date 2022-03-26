import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductPag } from 'src/app/model/product';
import { Productcategory } from 'src/app/model/productcategory';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  formDetailProduct!: FormGroup;
  productCategory?: Productcategory;
  product?: Product;
  id!: number;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eidtFormProduct();
  }

  private eidtFormProduct() {
    this.id = this.route.snapshot.params['id'];
    this.formDetailProduct = this.formBuilder.group({
      id: [],
      name: [''],
      description: [''],
      imageUrl: [''],
      price: [0],
      productCategoryName: [''],
    });
    this.productService
      .getProductById(this.id)
      .subscribe((response: Product) => {
        this.formDetailProduct.patchValue(response);
        this.getProductCategoryById(response.productCategoryId);
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

  public get f() {
    return this.formDetailProduct.controls;
  }

  public getProductCategoryById(productCategoryId: number | undefined) {
    this.productCategoryService
      .getProductCategoryById(productCategoryId)
      .subscribe(
        (response: Productcategory) => {
          this.productCategory = response;
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
