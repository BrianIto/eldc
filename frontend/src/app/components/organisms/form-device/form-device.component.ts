import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckIcon } from 'lucide-angular';
import { InputTextComponent } from '../../molecules/input-text/input-text.component';
import { SelectComponent } from '../../molecules/select/select.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-form-device',
  imports: [
    InputTextComponent,
    SelectComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './form-device.component.html',
})
export class FormDeviceComponent {
  readonly CheckIcon = CheckIcon;

  @Input() categories: { id: number; name: string }[] = [];
  @Output() cancel = new EventEmitter<void>();

  formGroup = new FormBuilder().group({
    category: [
      {} as Partial<{ id: number; name: string }>,
      Validators.required,
    ],
    partNumber: [null as number | null, Validators.required],
    color: ['' as string, Validators.required],
  });

  @Output() confirm = new EventEmitter<typeof this.formGroup.value>();

  ngOnInit() {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.confirm.emit({
        ...this.formGroup.value,
        partNumber: +this.formGroup.value.partNumber!,
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  convertToSelectList(ArrObj: Record<string, any>[], labelKey: string) {
    return ArrObj.map((obj: Record<string, any>) => ({
      label: obj[labelKey],
      value: obj,
    }));
  }
}
