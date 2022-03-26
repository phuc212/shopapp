import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    let day1 = moment(AC.value);
    let day2 = moment(new Date());
    let day3 = moment(day1).diff(day2, 'day');
    console.log(day3);
    if (day3 > 0) {
      return { dateVaidator: true };
    }
    return null;
  }

  static dateMin(AC: AbstractControl) {
    let day1 = moment(AC.value); //19-01-1723
    let day2 = moment(new Date()); // 20-01-1723
    let day3 = moment(day1).diff(day2, 'day');
    if (day3 < -1) {
      return { dateMin: true };
    }
    return null;
  }

  static dateFormat(AC: AbstractControl) {
    let day1 = moment(AC.value, 'mm/dd/yyyy').isValid();
    if (!day1) {
      return { dateFormat: true };
    }
    return null;
  }
}
