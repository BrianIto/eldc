import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-option',
  imports: [],
  templateUrl: './select-option.component.html',
})
export class SelectOptionComponent<T> {
  @Input() label: string = '';
  @Input() value?: T;
  @Output() select = new EventEmitter<T>();

  onClick() {
    this.select.emit(this.value);
  }
}
