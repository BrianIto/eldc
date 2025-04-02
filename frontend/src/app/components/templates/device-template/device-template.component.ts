import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { TableDeviceComponent } from '../../organisms/table-device/table-device.component';
import { FormDeviceComponent } from '../../organisms/form-device/form-device.component';

@Component({
  selector: 'app-device-template',
  imports: [
    TableDeviceComponent,
    ButtonComponent,
    CommonModule,
    FormDeviceComponent,
  ],
  templateUrl: './device-template.component.html',
})
export class DeviceTemplateComponent {
  @Input() deviceList: {
    color: string;
    id: number;
    partNumber: number;
    category: Partial<{ id: number; name: string }>;
  }[] = [];

  @Input() categories: { id: number; name: string }[] = [];

  @Output() delete = new EventEmitter<{ id: number }>();
  @Output() new = new EventEmitter<
    Partial<{
      partNumber: number | null | undefined;
      color: string | null | undefined;
      category: Partial<{ id: number; name: string }> | null | undefined;
    }>
  >();

  @ViewChild('dialogNew') dialogNew!: ElementRef<HTMLDialogElement>;

  clickNew() {
    this.dialogNew.nativeElement.showModal();
  }

  onCancelNew() {
    this.dialogNew.nativeElement.close();
  }

  onDelete(id: { id: number }) {
    this.delete.emit(id);
  }

  onSubmitNew(
    data: Partial<{
      partNumber: number | null | undefined;
      color: string | null | undefined;
      category: Partial<{ id: number; name: string }> | null | undefined;
    }>,
  ) {
    this.new.emit(data);
    this.dialogNew.nativeElement.close();
  }
}
