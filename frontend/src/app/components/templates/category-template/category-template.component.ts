import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormCategoryComponent } from '../../organisms/form-category/form-category.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TableCategoryComponent } from '../../organisms/table-category/table-category.component';

@Component({
  selector: 'app-category-template',
  imports: [FormCategoryComponent, ButtonComponent, TableCategoryComponent],
  standalone: true,
  templateUrl: './category-template.component.html',
})
export class CategoryTemplateComponent {
  @Input() categoryList: { id: number; name: string }[] = [];

  @Output() delete = new EventEmitter<{ id: number }>();
  @Output() new = new EventEmitter<Partial<{ name: string | null }>>();

  @ViewChild('dialogNew') dialogNew!: ElementRef<HTMLDialogElement>;

  clickNew() {
    this.dialogNew.nativeElement.showModal();
  }

  onCancelNew() {
    this.dialogNew.nativeElement.close();
  }

  onSubmitNew(data: Partial<{ name: string | null }>) {
    this.new.emit(data);
    this.dialogNew.nativeElement.close();
  }

  onDelete(id: { id: number }) {
    this.delete.emit(id);
  }
}
