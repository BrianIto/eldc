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
  selector: 'app-table-category',
  imports: [LucideAngularModule, CommonModule, ButtonComponent],
  templateUrl: './table-category.component.html',
  styleUrl: './table-category.component.css',
})
export class TableCategoryComponent {
  @Input() categoriesList: { id: number; name: string }[] = [];

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
    this.dialogDelete.nativeElement.close();
  }

  onCreateFirst() {
    this.createFirst.emit();
  }

  onCancelDelete() {
    this.dialogDelete.nativeElement.close();
  }
}
