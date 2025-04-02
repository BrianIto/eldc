import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  @ViewChild('dialogNew') dialogNew!: ElementRef<HTMLDialogElement>;

  clickNew() {
    this.dialogNew.nativeElement.showModal();
  }

  onCancelNew() {
    this.dialogNew.nativeElement.close();
  }

  onSubmitNew(data: any) {
    console.log(data);
  }
}
