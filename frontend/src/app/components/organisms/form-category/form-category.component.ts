import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../molecules/input-text/input-text.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CheckIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-form-category',
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
    LucideAngularModule,
  ],
  standalone: true,
  templateUrl: './form-category.component.html',
})
export class FormCategoryComponent implements OnInit {
  readonly CheckIcon = CheckIcon;


  @Output() cancel = new EventEmitter<void>();

  formGroup = new FormBuilder().group({
    name: ['', Validators.required],
  });

  @Output() confirm = new EventEmitter<typeof this.formGroup.value>();

  ngOnInit() {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.confirm.emit(this.formGroup.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
