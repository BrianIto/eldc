import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/atoms/button/button.component';
import { ListIcon, SmartphoneIcon } from 'lucide-angular';
import { SelectOption } from './components/molecules/select/select.component';
import { FormCategoryComponent } from './components/organisms/form-category/form-category.component';
import { CategoryTemplateComponent } from './components/templates/category-template/category-template.component';
import { DeviceTemplateComponent } from './components/templates/device-template/device-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    FormCategoryComponent,
    CategoryTemplateComponent,
    DeviceTemplateComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';

  readonly ListIcon = ListIcon;
  readonly SmartphoneIcon = SmartphoneIcon;

  selectOptions: SelectOption<string>[] = [{ label: 'Teste 1', value: '123' }];
  selectedTab: 'Category' | 'Device' = 'Category';

  changeTab(tab: typeof this.selectedTab) {
    this.selectedTab = tab;
  }
}
