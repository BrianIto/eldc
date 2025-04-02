import { Component, Input, forwardRef, OnInit, Injector } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import {
  getValidationErrors,
  DEFAULT_VALIDATION_MESSAGES,
  ValidationMessages,
} from '../../../utils/validation.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() showValidation: boolean = true;

  // Custom error messages - can be string or function
  @Input() errorMessages: ValidationMessages = {};

  value: any = '';
  control?: NgControl;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private injector: Injector) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl && ngControl.control) {
      this.control = ngControl;
    }
  }
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  get validationClasses(): string {
    if (!this.showValidation || !this.control) {
      return '';
    }

    if (this.control.pristine || this.control.untouched) {
      return '';
    }

    return this.control.valid
      ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
      : 'border-red-500 focus:ring-red-500 focus:border-red-500';
  }

  get errors(): string[] {
    return getValidationErrors(
      this.control?.control,
      this.errorMessages,
      DEFAULT_VALIDATION_MESSAGES,
    );
  }
}
