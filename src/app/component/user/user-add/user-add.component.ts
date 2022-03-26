import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/customvalidator/date.validator';
import { Utility } from 'src/app/customvalidator/utility';
import { ExceptionResponse } from 'src/app/model/supplier';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  formAddUser!: FormGroup;
  submited: boolean = false;
  exceptionResponse?: ExceptionResponse;
  userError?: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private utility: Utility,
    private toaStr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createFormAddUser();
    this.formAddUser.valueChanges.subscribe(() => {
      this.submited = false;
    });
  }

  createFormAddUser() {
    this.formAddUser = this.formBuilder.group(
      {
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
        password: [
          '',
          [
            this.utility.requiredValidator('mật khẩu'),
            this.utility.minlengthValidator('mật khẩu', 8),
            this.utility.maxlengthValidator('mật khẩu', 16),
          ],
        ],
        confirmPassword: [''],
      },
      {
        validators: [this.utility.mushMatch('password', 'confirmPassword')],
      }
    );
  }

  get f() {
    return this.formAddUser.controls;
  }

  addUser() {
    this.userService.saveUser(this.formAddUser.value).subscribe(
      (response: User) => {
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
    this.toaStr.success('* thêm mới nhân viên thành công', 'success', {
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
