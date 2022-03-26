import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import vi from '@angular/common/locales/en';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AutofocusDirective } from './autofocus.directive';
import { ProductDetailComponent } from './product-detail/product-detail.component';
@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    AutofocusDirective,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class ProductModule {}
