import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule, TrashIcon } from 'lucide-angular';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-table-device',
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './table-device.component.html',
})
export class TableDeviceComponent {
  @Input() deviceList: {
    color: string;
    id: number;
    partNumber: number;
    category: Partial<{ id: number; name: string }>;
  }[] = [];

  @Output() delete = new EventEmitter<{ id: number }>();
  @Output() createFirst = new EventEmitter<void>();

  @ViewChild('dialogDelete') dialogDelete!: ElementRef<HTMLDialogElement>;

  deleteIdSelected: number = -1;
  readonly TrashIcon = TrashIcon;

  onDelete(id: number) {
    this.deleteIdSelected = id;
    this.dialogDelete.nativeElement.showModal();
  }

  onConfirmDelete() {
    this.delete.emit({ id: this.deleteIdSelected });
  }

  onCreateFirst() {
    this.createFirst.emit();
  }

  onCancelDelete() {
    this.dialogDelete.nativeElement.close();
  }
}
