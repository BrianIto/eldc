import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { SelectOptionComponent } from '../../atoms/select-option/select-option.component';
import { SelectButtonComponent } from '../../atoms/select-button/select-button.component';
import { PopupComponent } from '../../atoms/popup/popup.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select',
  imports: [
    CommonModule,
    SelectOptionComponent,
    SelectButtonComponent,
    PopupComponent,
  ],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> implements ControlValueAccessor {
  open: boolean = false;

  @Input() label?: string;
  @Input() options: SelectOption<T>[] = [];
  valueSelected?: T;

  @ViewChild(SelectButtonComponent, { read: ElementRef })
  selectButton!: ElementRef;
  @ViewChild(PopupComponent, { read: ElementRef }) popup!: ElementRef;
  selectedIndex?: number;

  // ControlValueAccessor implementation
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;

  onOpen({ open }: { open: boolean }) {
    if (!this.disabled) {
      this.open = open;
    }
  }

  onSelect(element: T, index: number) {
    this.selectedIndex = index;
    this.valueSelected = element;
    this.onChange(element);
    this.onTouched();
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.open) {
      const clickedInsideButton = this.selectButton?.nativeElement.contains(
        event.target,
      );
      const clickedInsidePopup = this.popup?.nativeElement.contains(
        event.target,
      );

      if (!clickedInsideButton && !clickedInsidePopup) {
        this.open = false;
        this.onTouched();
      }
    }
  }

  onClear() {
    this.selectedIndex = undefined;
    this.valueSelected = undefined;
  }

  // ControlValueAccessor methods
  writeValue(value: T): void {
    this.valueSelected = value;
    if (this.options && value) {
      this.selectedIndex = this.options.findIndex(
        (option) => option.value === value,
      );
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
