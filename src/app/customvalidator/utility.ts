import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Utility {
  constructor() {}

  validateText(
    str: string,
    length?: number | null,
    maxLength?: number | null
  ): boolean {
    str = str ? str.toString() : '';
    if (str) {
      if (
        !str.trim() ||
        str.trim() === '' ||
        (length && str.length < length) ||
        (maxLength && str.length > maxLength)
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  // Required validator function
  public requiredValidator(fieldName: string = '') {
    return (control: FormControl) => {
      const name = control.value;
      if (!name || !this.validateText(name)) {
        return {
          required: '* vui lòng nhập ' + fieldName,
        };
      }
      return null;
    };
  }

  // Required validator function
  public maxlengthValidator(fieldName: string = '', length: number) {
    return (control: FormControl) => {
      const name = control.value;
      if (name && !this.validateText(name, null, length)) {
        return {
          maxlength: `* ${fieldName} không thể quá ${length} ký tự`,
        };
      }
      return null;
    };
  }

  // Required validator function
  public minlengthValidator(fieldName: string = '', length: number) {
    return (control: FormControl) => {
      const name = control.value;
      if (name && !this.validateText(name, length)) {
        return {
          minlength: `* ${fieldName} không thể nhỏ hơn ${length} ký tự`,
        };
      }
      return null;
    };
  }

  // Email form control validator function
  public emailValidator = function (fieldName: string = '') {
    return (control: FormControl) => {
      const email = control.value;
      const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
      if (email && !reg.test(email)) {
        return {
          email: `* ${fieldName} không hợp lệ (ví dụ test@gmail.com)`,
        };
      }
      return null;
    };
  };

  // phoneNumber form control validator function
  public phoneNumberValidator = function (fieldName: string = '') {
    return (control: FormControl) => {
      const phoneNumber = control.value;
      const reg = /(84|0[3|5|7|8|9])+([0-9]{9})/;
      if (phoneNumber && !reg.test(phoneNumber)) {
        return {
          phoneNumber: `* ${fieldName} không hợp lệ (ví dụ 09888888888)`,
        };
      }
      return null;
    };
  };

  // min validator
  public minValidator(fieldName: string = '', numField: number) {
    return (control: FormControl) => {
      const num = control.value;
      if (num < numField) {
        return {
          min: `* ${fieldName} phải lớn hơn ${numField}`,
        };
      }
      return null;
    };
  }

  // max validator
  public maxValidator(fieldName: string = '', numField: number) {
    return (control: FormControl) => {
      const num = control.value;
      if ((num as number) && num > numField) {
        return {
          max: `* ${fieldName} không thể lớn hơn ${numField}`,
        };
      }
      return null;
    };
  }

  // custom validator to check that two fields match
  public mushMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: '* mật khẩu phải trùng khớp' });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
