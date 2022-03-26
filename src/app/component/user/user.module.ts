import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserComponent,
    UserAddComponent,
    UserListComponent,
    AutofocusDirective,
    UserDetailComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzSelectModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
