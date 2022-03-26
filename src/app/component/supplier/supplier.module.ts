import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SuplierEditComponent } from './supplier-edit/suplier-edit.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import vi from '@angular/common/locales/en';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { AutofocusDirective } from './autofocus.directive';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierListComponent,
    SuplierEditComponent,
    SupplierDetailComponent,
    AutofocusDirective,
    SupplierAddComponent,
  ],
  imports: [
    SupplierRoutingModule,
    CommonModule,
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class SupplierModule {}
