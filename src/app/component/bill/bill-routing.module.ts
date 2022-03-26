import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillListComponent } from './bill-list/bill-list.component';
import { BillAddComponent } from './bill-add/bill-add.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillEditComponent } from './bill-edit/bill-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BillListComponent,
  },
  {
    path: 'add',
    component: BillAddComponent,
  },
  {
    path: 'edit/:id',
    component: BillEditComponent,
  },
  {
    path: 'detail/:id',
    component: BillDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {}
