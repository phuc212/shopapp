import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillAddComponent } from './bill-add/bill-add.component';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillEditComponent } from './bill-edit/bill-edit.component';
import { AutofocusDirective } from './autofocus.directive';
import localeVI from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeVI);

@NgModule({
  declarations: [
    BillListComponent,
    BillAddComponent,
    BillDetailComponent,
    BillEditComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    NzSelectModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'vi' }],
})
export class BillModule {}
