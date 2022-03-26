import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { InventoryManagerRoutingModule } from './inventory-manager-routing.module';
import { InventoryManagerComponent } from './inventory-manager.component';
import { ProductInventoryListComponent } from './product-inventory-list/product-inventory-list.component';
import { ImportBillDetailListComponent } from './import-bill-detail-list/import-bill-detail-list.component';
import localeVI from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeVI);

@NgModule({
  declarations: [
    InventoryManagerComponent,
    ProductInventoryListComponent,
    ImportBillDetailListComponent,
  ],
  imports: [
    CommonModule,
    InventoryManagerRoutingModule,
    FormsModule,
    NzPaginationModule,
    NzSelectModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'vi' }],
})
export class InventoryManagerModule {}
