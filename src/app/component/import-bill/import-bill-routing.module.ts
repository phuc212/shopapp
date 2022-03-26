import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportBillEditComponent } from './import-bill-edit/import-bill-edit.component';
import { ImportBillDetailComponent } from './import-bill-detail/import-bill-detail.component';
import { ImportBillAddComponent } from './import-bill-add/import-bill-add.component';
import { ImportBillListComponent } from './import-bill-list/import-bill-list.component';
import { ImportBillComponent } from './import-bill.component';
import { GuardGuard as Guard } from 'src/app/_shared/guard/guard.guard';
import { AuthGuardGuard as AuthGuard } from 'src/app/_shared/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ImportBillListComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'add',
    component: ImportBillAddComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'edit/:id',
    component: ImportBillEditComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'detail/:id',
    component: ImportBillDetailComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportBillRoutingModule {}
