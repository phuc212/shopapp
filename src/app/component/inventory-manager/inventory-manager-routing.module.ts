import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductInventoryListComponent } from './product-inventory-list/product-inventory-list.component';
import { ImportBillDetailListComponent } from './import-bill-detail-list/import-bill-detail-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductInventoryListComponent,
  },
  {
    path: 'import-bill-detail-list/:id',
    component: ImportBillDetailListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryManagerRoutingModule {}
