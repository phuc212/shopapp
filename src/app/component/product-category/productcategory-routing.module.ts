import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryAddComponent } from './product-category-add/product-category-add.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryDetailComponent } from './product-category-detail/product-category-detail.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';
import { GuardGuard as Guard } from 'src/app/_shared/guard/guard.guard';
import { AuthGuardGuard as AuthGuard } from 'src/app/_shared/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryListComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'add',
    component: ProductCategoryAddComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'edit/:id',
    component: ProductCategoryEditComponent,
    canActivate: [Guard, AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'detail/:id',
    component: ProductCategoryDetailComponent,
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
export class ProductCategoryRoutingModule {}
