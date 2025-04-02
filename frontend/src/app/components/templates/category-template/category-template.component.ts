import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @Input() categoryList = [{ name: 'Categoria 1', id: 1 }];

  @ViewChild('dialogNew') dialogNew!: ElementRef<HTMLDialogElement>;

  clickNew() {
    this.dialogNew.nativeElement.showModal();
  }

  onCancelNew() {
    this.dialogNew.nativeElement.close();
  }

  onSubmitNew(data: Partial<{ name: string | null }>) {
    console.log(data);
  }
}
