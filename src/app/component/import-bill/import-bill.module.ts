import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ImportBillRoutingModule } from './import-bill-routing.module';
import { ImportBillComponent } from './import-bill.component';
import { ImportBillListComponent } from './import-bill-list/import-bill-list.component';
import { ImportBillAddComponent } from './import-bill-add/import-bill-add.component';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportBillDetailComponent } from './import-bill-detail/import-bill-detail.component';
import { ImportBillEditComponent } from './import-bill-edit/import-bill-edit.component';
import { AutofocusDirective } from './autofocus.directive';
import localeVI from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeVI);

@NgModule({
  declarations: [
    ImportBillComponent,
    ImportBillListComponent,
    ImportBillAddComponent,
    ImportBillDetailComponent,
    ImportBillEditComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    ImportBillRoutingModule,
    NzSelectModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'vi' }],
})
export class ImportBillModule {}
