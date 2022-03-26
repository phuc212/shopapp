import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_shared/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'product-category-manager',
    loadChildren: () =>
      import('./component/product-category/prductcategory.module').then(
        (m) => m.ProductcategoryModule
      ),
  },
  {
    path: 'supplier-manager',
    loadChildren: () =>
      import('./component/supplier/supplier.module').then(
        (m) => m.SupplierModule
      ),
  },
  {
    path: 'product-manager',
    loadChildren: () =>
      import('./component/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'user-manager',
    redirectTo: 'user-manager',
    pathMatch: 'full',
  },
  {
    path: 'import-bill-manager',
    loadChildren: () =>
      import('./component/import-bill/import-bill.module').then(
        (m) => m.ImportBillModule
      ),
  },
  {
    path: 'inventory-manager',
    loadChildren: () =>
      import('./component/inventory-manager/inventory-manager.module').then(
        (m) => m.InventoryManagerModule
      ),
  },
  {
    path: 'bill-manager',
    loadChildren: () =>
      import('./component/bill/bill.module').then((m) => m.BillModule),
  },
  {
    path: 'user-manager',
    loadChildren: () =>
      import('./component/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
