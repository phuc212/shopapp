import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  @Input() formGroup?: FormGroup;

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  @HostListener('ngSubmit')
  public onSubmit(): void {
    if ('INVALID' === this.formGroup?.status) {
      const formGroupInvalid =
        this.elementRef.nativeElement.querySelectorAll('.ng-invalid');
      (<HTMLInputElement>formGroupInvalid[0]).focus();
    }
  }
}
