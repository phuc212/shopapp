import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { GuardGuard as Guard } from 'src/app/_shared/guard/guard.guard';
import { AuthGuardGuard as AuthGuard } from 'src/app/_shared/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
  {
    path: 'add',
    component: ProductAddComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
