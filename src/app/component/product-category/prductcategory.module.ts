import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryRoutingModule } from './productcategory-routing.module';
import { ProductcategoryComponent } from './productcategory.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import vi from '@angular/common/locales/en';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryDetailComponent } from './product-category-detail/product-category-detail.component';
import { ProductCategoryAddComponent } from './product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';
import { AutofocusDirective } from './autofocus.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductcategoryComponent,
    ProductCategoryListComponent,
    ProductCategoryDetailComponent,
    ProductCategoryAddComponent,
    ProductCategoryEditComponent,
    AutofocusDirective,
  ],
  imports: [
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    ProductCategoryRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [],
})
export class ProductcategoryModule {}
