import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPag, ProductPagination } from 'src/app/model/product';
import { Productcategory } from 'src/app/model/productcategory';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-category-detail',
  templateUrl: './product-category-detail.component.html',
  styleUrls: ['./product-category-detail.component.css'],
})
export class ProductCategoryDetailComponent implements OnInit {
  id?: number;
  form!: FormGroup;
  products?: ProductPag[];

  listPageSize = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalProducts = 0;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      id: [0],
      name: [''],
      description: [''],
    });

    if (this.id !== 0) {
      this.productCategoryService
        .getProductCategoryById(this.id)
        .subscribe((response: Productcategory) => {
          this.form.patchValue(response);
        });
    }
    this.getAllByProductCategoryId(
      this.id,
      this.currentPage - 1,
      this.pageSize.value
    );
  }

  public getAllByProductCategoryId(
    id: number | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.productService
      .getAllByProductCategoryId(id, currentPage, pageSize)
      .subscribe((response: ProductPagination) => {
        console.log(response.content);
        this.products = response.content;
        this.totalProducts = response.totalElements;
      });
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    this.getAllByProductCategoryId(
      this.id,
      this.currentPage - 1,
      this.pageSize.value
    );
  }
  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    this.getAllByProductCategoryId(
      this.id,
      this.currentPage - 1,
      this.pageSize.value
    );
  }

  public redirectList() {
    this.router.navigate(['/product-category-manager']);
  }
}
