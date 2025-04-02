import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/atoms/button/button.component';
import { ListIcon, SmartphoneIcon } from 'lucide-angular';
import { FormCategoryComponent } from './components/organisms/form-category/form-category.component';
import { CategoryTemplateComponent } from './components/templates/category-template/category-template.component';
import { DeviceTemplateComponent } from './components/templates/device-template/device-template.component';
import { CommonModule } from '@angular/common';
import { CategoriesService } from './services/categories.service';
import { catchError, take, throwError } from 'rxjs';
import { DevicesService } from './services/devices.service';

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
export class AppComponent implements OnInit {
  title = 'frontend';

  readonly ListIcon = ListIcon;
  readonly SmartphoneIcon = SmartphoneIcon;

  selectedTab: 'Category' | 'Device' = 'Category';

  categories: { id: number; name: string }[] = [];
  devices: {
    id: number;
    partNumber: number;
    color: string;
    category: { id: number };
  }[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private devicesService: DevicesService,
  ) {}

  ngOnInit() {
    this.reloadCategories();
    this.reloadDevices();
  }

  changeTab(tab: typeof this.selectedTab) {
    this.selectedTab = tab;
  }

  reloadCategories() {
    this.categoriesService
      .getAll(1, 100)
      .pipe(take(1))
      .subscribe((v) => {
        this.categories = v;
      });
  }

  reloadDevices() {
    this.devicesService
      .getAll(1, 100)
      .pipe(take(1))
      .subscribe((v) => (this.devices = v));
  }

  newCategory(e: Partial<{ name: string | null }>) {
    this.categoriesService.create(e).subscribe(() => this.reloadCategories());
  }

  newDevice(
    e: Partial<{ partNumber: number; color: string; category: { id: number } }>,
  ) {
    this.devicesService
      .create(e)
      .pipe(take(1))
      .subscribe(() => this.reloadDevices());
  }

  deleteCategory(id: { id: number }) {
    this.categoriesService
      .delete(id.id)
      .pipe(
        take(1),
        catchError(() => {
          window.alert('Impossible to remove this category');
          return throwError(
            () => new Error('Impossible to remove this category'),
          );
        }),
      )
      .subscribe(() => this.reloadCategories());
  }

  deleteDevice(id: { id: number }) {
    this.devicesService
      .delete(id.id)
      .pipe(take(1))
      .subscribe(() => this.reloadDevices());
  }
}
