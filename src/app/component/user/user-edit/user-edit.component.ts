import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { Utility } from 'src/app/customvalidator/utility';
import { Role } from 'src/app/model/role';
import { ExceptionResponse } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  formEditUser!: FormGroup;
  roles?: Role[];
  submited: boolean = false;
  exceptionResponse?: ExceptionResponse;
  userError?: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private utility: Utility,
    private toaStr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createFormEditUser();
    this.getAllRole();
    this.formEditUser.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  createFormEditUser() {
    this.id = this.route.snapshot.params['id'];
    this.formEditUser = this.formBuilder.group({
      id: [],
      fullName: [
        '',
        [
          this.utility.requiredValidator('tên nhân viên'),
          this.utility.minlengthValidator('tên nhân viên', 5),
          this.utility.maxlengthValidator('tên nhân viên', 100),
        ],
      ],
      gender: ['', this.utility.requiredValidator('giới tính')],
      dayOfBirth: [
        '',
        Validators.compose([
          DateValidator.dateVaidator,
          DateValidator.dateMin,
          DateValidator.dateFormat,
        ]),
      ],
      address: ['', [this.utility.requiredValidator('địa chỉ nhân viên')]],
      phoneNumber: [
        '',
        [
          this.utility.requiredValidator('số điện thoại nhân viên'),
          this.utility.phoneNumberValidator('số điện thoại nhân viên'),
        ],
      ],
      email: [
        '',
        [
          this.utility.requiredValidator('email nhân viên'),
          this.utility.emailValidator('email nhân viên'),
        ],
      ],
      password: [],
      roleId: [],
    });
    this.userService.getUserById(this.id).subscribe((response: User) => {
      console.log(response);
      this.formEditUser.patchValue(response);
      this.formEditUser
        .get('dayOfBirth')
        ?.patchValue(this.formatDate(response.dayOfBirth));
    });
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get f() {
    return this.formEditUser.controls;
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );
  }

  editUser() {
    this.userService.updateUser(this.formEditUser.value).subscribe(
      (response: void) => {
        this.router.navigate(['/user-manager']);
        this.showToastrSuccess();
        this.submited = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 409) {
          this.userError = error.error;
          this.submited = true;
          console.log(this.userError);
        } else {
          this.exceptionResponse = error.error;
          this.submited = true;
          this.showToastrError();
          console.log(this.exceptionResponse?.message);
        }
      }
    );
  }

  showToastrSuccess() {
    this.toaStr.success('* Chỉnh sửa nhân viên thành công', 'success', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showToastrError() {
    this.toaStr.error(this.exceptionResponse?.message, 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  redirectList() {
    this.router.navigate(['user-manager']);
  }
}
