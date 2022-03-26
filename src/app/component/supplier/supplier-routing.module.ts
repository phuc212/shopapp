import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SuplierEditComponent } from './supplier-edit/suplier-edit.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { GuardGuard as Guard } from 'src/app/_shared/guard/guard.guard';
import { AuthGuardGuard as AuthGuard } from 'src/app/_shared/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'add',
    component: SupplierAddComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'edit/:id',
    component: SuplierEditComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'detail/:id',
    component: SupplierDetailComponent,
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
export class SupplierRoutingModule {}
