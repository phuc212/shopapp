import {
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[appInvalidElmFocus]',
})
export class InvalidElmFocusDirective {
  @ContentChildren(NgModel, { descendants: true, read: ElementRef })
  inputFields?: QueryList<ElementRef>;

  @ContentChildren(NgModel, { descendants: true })
  ngModels?: QueryList<NgModel>;

  constructor(private _ngForm: NgForm) {}

  @HostListener('ngSubmit')
  onSubmit() {
    if (this._ngForm.valid) return;

    this._ngForm.control.markAllAsTouched();

    for (let i = 0; i < this.ngModels!.length; i++) {
      if (this.ngModels?.get(i)?.control.errors) {
        this.inputFields?.get(i)?.nativeElement.focus();
        break;
      }
    }

    // invalidInputFields[0].nativeElement.focus();
  }
}
